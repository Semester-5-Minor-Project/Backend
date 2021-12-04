const mongoose = require("mongoose");
const School = require("../models/School");
const Principal = require("../models/Principal");

const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.addPrincipal = async (req, res) => {
    const { emp_id, name, school } = req.body;
    const nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 4);
    const username = `principal-${nanoid()}`;
    const password = `${nanoid()}${nanoid()}`;
    const principal_id = `pri-${nanoid()}`;

    try {
        const school_id = await School.findOne({
            school_id: school
        }, ["_id"])

        if (school_id) {
            try {
                bcrypt.hash(password, SALTROUNDS, async (err, hash) => {
                    const principal = await Principal.create(
                        {
                            username,
                            password: hash,
                            emp_id,
                            name,
                            principal_id
                        }
                    )
                    
                    if (!principal) {
                        throw new Error("Failed to add Principal.");
                    }
                    const school = await School.update({ id: school_id }, {
                        principal: principal["_id"]
                    })
                    
                    res.status(200).json({
                        username,
                        password
                    });
                })
            } catch (err) {
                res.status(500).send(err);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getPrincipal = async (req, res) => {
    const { username, password } = req.params;

    try {
        const principal = await Principal.findOne({
            username
        });

        if (principal) {
            bcrypt.compare(password, principal.password, (err, result) => {
                if (result) {
                    res.status(200).send({
                        username: principal["principal_id"],
                        name: principal["name"],
                        school: principal["school"]
                    });
                } else {
                    res.status(200).json(
                        {
                            message: "Incorrect password"
                        }
                    )
                }
            })
        } else {
            res.status(200).json(
                {
                    message: "User does not exist."
                }
            );
        }
    } catch (err) {

    }
}

exports.listPrincipals = async (req, res) => {
    try {
        const principals = await Principal.find({}, ["name", "emp_id"]);
        
        res.send(principals);
    } catch (e) {
        console.log(e);
    }
}