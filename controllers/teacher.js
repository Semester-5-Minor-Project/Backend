const Teacher = require("../models/Teacher");
const SchoolModel = require("../models/School");

const { customAlphabet } = require("nanoid");
exports.addTeacher = async (req, res) => {
    const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);
    const { fullName, DOB, School, gender, eid, designation, email } = req.body;
    
    try {
        const school_id = await SchoolModel.findOne({
            school_id: School
        }, ["_id"])

        const teacher = await Teacher.create(
            {
                teacher_id: `tea-${nanoid()}`,
                name: fullName,
                dob: DOB,
                school: school_id,
                gender,
                emp_id: eid,
                designation,
                email,
                courses: []
            }
        )

        if(teacher) {
            res.status(200).send({
                message: `Teacher added.`
            })
        } else {
            res.status(500).json(
                {
                    message: `Unable to add.`
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}

exports.listTeachersBySchool = async (req, res) => {
    const { school_id } = req.params;

    try {
        const school = await SchoolModel.findOne(
            {
                school_id
            }
        );

        if(school) {
            const teachers = await Teacher.find(
                {
                    school: school["_id"]
                },
                ["teacher_id", "name", "dob", "gender", "courses", "email", "emp_id"]
            )

            res.status(200).send(teachers);
        } else {
            res.status(500).json(
                {
                    message: "No such School exists."
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}