const mongoose = require("mongoose");
const School = require("../models/School");
const Principal = require("../models/Principal");
const Student = require("../models/Student");

const { customAlphabet } = require("nanoid");

exports.addSchool = async (req, res) => {
    const { name, address, email, contact_number } = req.body;

    const nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 4)
    const school = await School.create(
        {
            name,
            address,
            email,
            contact_number,
            school_id: `sch-${nanoid()}`
        }
    )

    if (school) {
        res.status(200).json(
            {
                message: "School added."
            }
        )
    } else {
        throw new Error("Failed to add school.");
    }
}

exports.listSchools = async (req, res) => {
    try {
        const schools = await School.find({}, ["school_id", "name", "address"]);
        res.send(schools);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.listStudentsBySchool = async (req, res) => {
    const { school_id } = req.params;

    try {
        const school = await School.find(
            {
                school_id
            },
        );

        if (!school) {
            res.status(500).json(
                {
                    message: "No such school exists."
                }
            )
        } else {
            const students = await Student.find(
                {
                    currentSchool: school[0]["_id"]
                }
            );

            if (!students || students.length == 0) {
                res.status(500).json(
                    {
                        message: "No students in this school."
                    }
                )
            } else {
                res.status(200).json(students);
            }
        }
    } catch (err) {
        console.log(err);
    }
}