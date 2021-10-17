const mongoose = require("mongoose");
const DSEUT = require("../models/DSEUT");
const SuperAdmin = require("../models/SuperAdmin");

const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.getAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await SuperAdmin.findOne(
        {
            username: name,
            password: password
        }
    )

    if(admin) {
        console.log("admin found.");
        return admin;
    } else {
        console.log("not found.");
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
            res.json(password);
        })
    } catch(e) {
        console.log(e);
    }
}