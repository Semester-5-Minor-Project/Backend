const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schoolSchema = new mongoose.Schema(
    {
        school_id: {
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 6,
        },
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 100
        },
        address: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true
        },
        contact_number: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 15
        }
    }
)

module.exports = mongoose.model("School", schoolSchema);