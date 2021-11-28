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

exports.assignCourses = async (req, res) => {
    const { courses_assigned, teacher_id } = req.body;

    try {
        const teacher = await Teacher.updateOne({ teacher_id }, {
            $push: {
                courses: courses_assigned
            }
        })

        if(teacher) {
            res.status(200).send(teacher);
        } else {
            res.status(200).send(
                {
                    message: "Unable to assign courses"
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}

exports.removeCourses = async (req, res) => {
    const { courses_remove, teacher_id } = req.body;

    try {
        const teacher = await Teacher.updateOne({ teacher_id }, {
            $pull: {
                courses: {
                    $in: courses_remove 
                }
            }
        })

        if(teacher) {
            res.status(200).send(teacher);
        } else {
            res.status(200).send(
                {
                    message: "Unable to assign courses"
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}

exports.listCourses = async (req, res) => {
    const { teacher_id } = req.query;
    
    try {
        const courses = await Teacher.find({ teacher_id }, ["courses"])

        if(courses) {
            res.status(200).send(courses);
        } else {
            res.status(200).send(
                {
                    message: "Unable to fetch courses."
                }
            )
        }
    } catch(err) {
        console.log(err);
    }
}