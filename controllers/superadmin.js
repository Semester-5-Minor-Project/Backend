const mongoose = require("mongoose");
const DSEUT = require("../models/DSEUT");
const SuperAdmin = require("../models/SuperAdmin");

const { customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const SALTROUNDS = 5;
const SECRET = process.env.HASH_SECRET;

exports.getAdmin = async (req, res) => {
    const name = "admin-001";
    const password = "123456789";

    const admin = SuperAdmin.findOne(
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
    const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 8);

    const { username } = req.body;

    try {
        await bcrypt.hash(nanoid(), SALTROUNDS, (err, hash) => {
            const dse = DSEUT.create(
                {
                    username,
                    password : hash
                }
            )
            if(!dse) {
                throw new Error("Failed to create DSE.");
            }
            res.json(dse);
        })
    } catch(e) {
        console.log(e);
    }
}