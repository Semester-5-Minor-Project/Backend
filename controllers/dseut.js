const mongoose = require("mongoose");
const DSEUT = require("../models/DSEUT");

const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.getDSE = async (req, res) => {
    const { username, password } = req.body;
    
    const dse = await DSEUT.findOne(
        {
            username: username,
        }
    )

    if(dse) {
        bcrypt.compare(password, dse.password, (err, result) => {
            if(result) {
                res.status(200).send(dse["username"]);
            } else {
                res.status(500).json(
                    {
                        message: "Incorrect password"
                    }
                )
            }
        })
    } else {
        res.status(500).json(
            {
                message: "No such user exists"
            }
        )
    }
}