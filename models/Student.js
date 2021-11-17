const mongoose = require("mongoose");
const School = require("./School");
const { ObjectId } = mongoose.Schema;

const studentSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 10,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
            minlength: 5
        },
        DOB: {
            type: Date,
            required: true
        },
        fatherName: {
            type: String
        },
        motherName: {
            type: String
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        CWSN_status: {
            type: Boolean,
            required: true,
            default: false
        },
        CWSN_category: {
            type: String,
            required: false
        },
        email: {
            type: String,
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"]
        },
        photoURL: {
            type: String
        },
        currentSchool: {
            type: ObjectId,
            ref: School
        }
    }
)

module.exports = mongoose.model("Student", studentSchema);