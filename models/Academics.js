const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const academicsSchema = new mongoose.Schema(
    {
        student_id: {
            type: ObjectId,
            ref: "Student"
        },
        academics: [
            {
                school: {
                    type: ObjectId,
                    ref: "School"
                },
                year: Number,
                class: Number,
                attendance: [
                    {
                        date: {
                            type: String,
                            required,
                        },
                        status: {
                            type: String,
                            enum: ["Present", "Absent"],
                            default: "Absent"
                        }
                    }
                ],
                course: [
                    {
                        course_id: String,
                        course_name: String,
                        teacher: {
                            type: ObjectId,
                            ref: "Teacher"
                        },
                        scores: [
                            {
                                max_marks: Number,
                                obtained_marks: Number,
                                eval_name: String,
                                weightage: Number
                            }
                        ]
                    }
                ],
                // Promotion, Retention, Transfer, Migration
            }
        ]
    }
)

module.exports = mongoose.model("Academics", academicsSchema);