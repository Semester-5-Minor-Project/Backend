const DEOSchool = require("../models/DEOSchool");
const School = require("../models/School");
const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.addDeo = async (req, res) => {
    const { school_name } = req.body;
    const nanoid = customAlphabet("abcdefghijklmnop", 4);
    const username = `deo-${nanoid()}`;
    const password = `${nanoid()}${nanoid()}`;

    try {
        const school = await School.findOne(
            {
                name : school_name
            }
        )

        if(school) {
            await bcrypt.hash(password, SALTROUNDS, (err, hash) => {
                const deo = DEOSchool.create(
                    {
                        username,
                        password : hash,
                        school
                    }
                )
                if(!deo) {
                    throw new Error("Failed to add DEO.");
                }
                res.status(200).json({username, password});
            })
        } else {
            res.json(
                {
                    message: "No such school exists."
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}

exports.getDeo = async (req, res) => {
    const { username, password } = req.params;

    try {
        const deo = await DEOSchool.findOne(
            {
                username
            }
        )

        if(deo) {
            await bcrypt.compare(password, deo.password, (err, result) => {
                if(result) {
                    res.json("Match.");
                } else {
                    res.json(
                        {
                            message: "Incorrect password"
                        }
                    )
                }
            })
        } else {
            res.status(500).json(
                {
                    message: "No such user exists."
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}
