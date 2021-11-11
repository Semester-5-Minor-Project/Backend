const mongoose = require("mongoose");
const DSEUT = require("../models/DSEUT");
const SuperAdmin = require("../models/SuperAdmin");

const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.getAdmin = async (req, res) => {
    const { username, password } = req.params;
    
    const admin = await SuperAdmin.findOne(
        {
            username,
            password: password
        },
        ["username"]
    )

    if(admin) {
        res.status(200).send({
            username: admin["username"]
        });
    } else {
        res.status(500).send(
            {
                "Message": "Invalid Credentials."
            }
        )
    }
}

exports.addDse = async (req, res) => {
    const nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 8);

    const { username } = req.body;
    const password = nanoid();
    try {
        await bcrypt.hash(password, SALTROUNDS, (err, hash) => {
            const dse = DSEUT.create(
                {
                    username,
                    password : hash
                }
            )
            if(!dse) {
                throw new Error("Failed to create DSE.");
            }
            res.status(200).json(password);
        })
    } catch(e) {
        console.log(e);
    }
}