const mongoose = require("mongoose");
const School = require("../models/School");
const Principal = require("../models/Principal");

const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.addPrincipal = async (req, res) => {
    const { emp_id, name } = req.body;
    const nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 4);
    const username = `principal-${nanoid()}`;
    const password = `${nanoid()}${nanoid()}`;
    const principal_id = `pri-${nanoid()}`;

    await bcrypt.hash(password, SALTROUNDS, (err, hash) => {
        const principal = Principal.create(
            {
                username,
                password : hash,
                emp_id,
                name,
                principal_id
            }
        )
        if(!principal) {
            throw new Error("Failed to add Principal.");
        }
        res.json(password);
    })
}

exports.listPrincipals = async (req, res) => {
    try {
        const principals = await Principal.find({}, "name", (err, results) => {
            res.json(results);
        });
    } catch(e) {
        console.log(e);
    }
}