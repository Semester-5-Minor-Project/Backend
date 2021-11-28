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
                            required: true,
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
                        status: {
                            type: String,
                            enum: ["P", "F"]
                        }
                    }
                ],
                // Promotion, Retention, Transfer, Migration
            }
        ]
    }
)

module.exports = mongoose.model("Academics", academicsSchema);