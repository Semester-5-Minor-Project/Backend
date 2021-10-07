const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const teacherSchema = new mongoose.Schema(
    {
        teacher_id: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10,
        },
        emp_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 5
        },
        school: {
            type: ObjectId,
            ref: "School"
        },
        dob: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Transgender", "Other"]
        },
        caste: String,
        designation: String
    }
)

module.exports = mongoose.model("Teacher", teacherSchema);