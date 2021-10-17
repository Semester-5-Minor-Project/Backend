const mongoose = require("mongoose");
const School = require("../models/School");
const Principal = require("../models/Principal");

const { customAlphabet } = require("nanoid");

exports.addSchool = async (req, res) => {
    const { name, address, email, contact_number, principal_name } = req.body;

    const principal = await Principal.findOne(
        {
            name : principal_name
        }
    )
    if(principal) {
        const nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 4)
        const school = await School.create(
            {
                name,
                address,
                email,
                contact_number,
                principal,
                school_id : `sch-${nanoid()}`
            }
        )

        await principal.update(
            {
                school
            }
        )

        if(school) {
            res.json(
                {
                    message: "School added."
                }
            )
        } else {
            throw new Error("Failed to add school.");
        }
    } else {
        throw new Error("No such principal exists.");
    }
}