const mongoose = require("mongoose");
const Academics = require("../models/Academics");
const Student = require("../models/Student");
const School = require("../models/School");

exports.addAttendanceInfo = async (req, res) => {
    const { student_id, school_id, year, class_num, attendance } = req.body;

    try {
        const student = await Student.find({ student_id }, ["_id"]);
        const school = await School.find({ school_id }, ["_id"]);

        let academics = await Academics.find({ student_id: student, "academics.school": school, "academics.year": year }, [
            "academics.$"
        ]);

        if (academics && academics.length > 0) {
            academics = await Academics.update({ student_id: student, "academics.school": school, "academics.year": year }, {
                $push: {
                    "academics.$.attendance": attendance
                }
            }, { upsert: true })
        } else {
            academics = await Academics.update({ student_id: student }, {
                $push: {
                    academics: {
                        school: school[0]["_id"],
                        year: year,
                        class: class_num,
                        attendance: attendance
                    }
                }
            }, { upsert: true })
        }

        if (academics) {
            res.status(200).send(academics);
        } else {
            res.status(200).send(
                {
                    message: "Unable to add."
                }
            )
        }
    } catch (err) {
        console.log(err);
    }
}

exports.addAcademicInfo = async (req, res) => {
    const { student_id, school_id, year, class_num, courses_with_status } = req.body;

    try {
        const student = await Student.find({ student_id }, ["_id"]);
        const school = await School.find({ school_id }, ["_id"]);

        let academics = await Academics.find({ student_id: student, "academics.school": school, "academics.year": year });

        if (academics.length > 0) {
            academics = await Academics.update({ student_id: student, "academics.school": school, "academics.year": year }, {
                $push: {
                    "academics.$.course": courses_with_status
                }
            }, { upsert: true })
        } else {
            academics = await Academics.update({ student_id: student }, {
                $push: {
                    academics: {
                        school: school[0]["_id"],
                        year: year,
                        class: class_num,
                        course: courses_with_status
                    }
                }
            }, { upsert: true })
        }

        if (academics) {
            res.status(200).send(academics);
        } else {
            res.status(200).send(
                {
                    message: "Unable to add."
                }
            )
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getAcademicInfo = async (req, res) => {
    const { student_id, year } = req.params;

    try {
        const student = await Student.find({ student_id: student_id }, ["_id"]);
        const academics = await Academics.find({ student_id: student, "academics.year": year }, [
            "academics.$"
        ])
        const school = await School.findById(academics[0]["academics"][0]["school"], ["name"]);

        if (academics && academics.length) {
            res.status(200).send([academics, { school_name: school["name"] }]);
        } else {
            res.status(204).send(
                {
                    message: "No match found."
                }
            )
        }
    } catch (err) {
        res.status(204).send();
    }
}

exports.getStudentsInClass = async (req, res) => {
    const { school_id, class_num, year } = req.params;

    try {
        const school = await School.find({ school_id: school_id }, ["_id"]);

        const students = await Academics.find({ "academics.school": school, "academics.class": class_num, "academics.year": year }, ["student_id"]);

        let student_list = [];

        students.map((s) => {
            student_list.push(s["student_id"]);
        })

        const student_id_list = await Student.find({ "_id": { "$in": student_list } }, ["student_id", "fullName"]);

        res.status(200).send(student_id_list);
    } catch (err) {
        console.log(err);
    }
}

exports.getAcademicInfoSchoolYearClass = async (req, res) => {
    const { school_id, year, class_num } = req.query;

    try {
        const school = await School.find({ school_id: school_id }, ["_id"]);
        const students = await Academics.find({
            "academics.school": school,
            "academics.class": class_num,
            "academics.year": year
        },
        ["academics.$"]
        );

        if (students) {
            res.status(200).send(students);
        } else {
            res.status(204).send();
        }
    } catch (err) {

    }
}

exports.getCourseAcademicInfo = async (req, res) => {
    const { course_id, school_id, class_num } = req.query;

    try {
        const school = await School.find({ school_id: school_id }, ["_id"]);
        const students = await Academics.find({
            "academics.school": school,
            "academics.class": class_num,
            "academics.course.course_id": course_id
        },
        ["academics.year", "academics.course.$"]
        );

        if (students) {
            res.status(200).send(students);
        } else {
            res.status(204).send();
        }
    } catch (err) {

    }
}