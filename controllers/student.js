const Student = require("../models/Student");
const csv = require("csvtojson");
const fs = require("fs");
const { customAlphabet } = require("nanoid");
const School = require("../models/School");

const nanoid = customAlphabet("abcdefghikljmnopqrstuvwxyz0123456789", 6);

exports.addStudent = async (req, res) => {
    const { fullName, 
        DOB, 
        fatherName, 
        motherName, 
        address, 
        phone, 
        CWSN_category, 
        email, 
        bloodGroup, 
        school,
        link
    } = req.body;

    let CWSN_status = false;
    if(CWSN_category !== "None") {
        CWSN_status = true;
    }
    const student_id = `stu-${nanoid()}`;

    try {
        const schoolRef = await School.findOne(
            {
                school_id: school
            }, 
            ["_id"]
        )
        
        if(schoolRef) {
            try {
                const student = await Student.create(
                    {
                        student_id,
                        fullName,
                        DOB,
                        fatherName,
                        motherName,
                        address,
                        phone,
                        CWSN_category,
                        CWSN_status,
                        email,
                        bloodGroup,
                        photoURL: link,
                        currentSchool: schoolRef["_id"]
                    }
                )

                if(student) {
                    res.status(200).send(student_id);
                } else {
                    res.status(500).json(
                        {
                            message: "Unable to add student."
                        }
                    )
                }
            } catch(err) {
                console.log(err);
            }
        } else {
            res.status(500).json(
                {
                    message: "Unable to find school."
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}

exports.addBatchStudents = async (req, res) => {
    const { school } = req.body;
    if (req.files.student_file.mimetype === "text/csv") {
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
