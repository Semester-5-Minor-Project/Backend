const mongoose = require("mongoose");
const Student = require("./Student");
const { ObjectId } = mongoose.Schema;

const incentiveSchema = new mongoose.Schema(
    {
        student_id: {
            type: ObjectId,
            ref: Student
        },
        mid_day_meal: [{
            date: {
                type: Date
            },
            status: {
                type: String,
                enum: ["Y", "N"]
            }
        }],
        scholarship: [{
            month: {
                type: String
            },
            status: {
                type: String,
                enum: ["Y", "N"]
            },
        }],
        health_checkup: [{
            month: {
                type: String
            },
            status: {
                type: String,
                enum: ["Y", "N"]
            },
        }]
    }
)

module.exports = mongoose.model("Incentive", incentiveSchema);