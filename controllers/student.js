const Student = require("../models/Student");
const csv = require("csvtojson");
const fs = require("fs");
const { customAlphabet } = require("nanoid");
const School = require("../models/School");

const nanoid = customAlphabet("abcdefghikljmnopqrstuvwxyz0123456789", 6);

exports.addBatchStudents = async (req, res) => {
    const { school } = req.body;
    if (req.files.student_file.mimetype === "text/csv") {
        // const student_data = req.files.student_file.data.toString('utf8');
        // console.log(req.files.student_file);
        let json_data = await csv().fromFile(req.files.student_file.tempFilePath);
        const currentSchool = await School.find(
            {
                school_id: school
            }, ["_id"]
        )
        
        await json_data.forEach((j) => {
            let student_id = `stu-${nanoid()}`;
            j["student_id"] = student_id;
            (j["CWSN_status"] === "TRUE") ? (j["CWSN_status"] = true) : (j["CWSN_status"] = false);
            j["currentSchool"] = currentSchool[0]["_id"];
        })

        if (!currentSchool) {
            res.status(500).json(
                {
                    message: "Invalid School."
                }
            )
        } else {
            try {
                const students = await Student.insertMany(
                    json_data
                );

                if (!students) {
                    throw new Error("Unable to insert data.");
                }
                res.status(200).json(
                    {
                        message: "Inserted data successfully."
                    }
                )
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        res.status(500).json(
            {
                message: "Invalid file type."
            }
        )
    }
}

exports.addPhoto = async (req, res, next) => {
    const { student_id, link } = req.body;

    try {
        const student = await Student.updateOne({ student_id }, {
            photoURL: link
        })
        if (!student) {
            throw new Error("Unable to upload photo.");
        }
        res.status(200).json(
            {
                message: "Uploaded photo successfully."
            })
    } catch (err) {
        console.log(err);
    }
}
