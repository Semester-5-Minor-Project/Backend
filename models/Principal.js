const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const principalSchema = new mongoose.Schema(
    {
        principal_id: {
            type: String,
            required: true,
            unique: true,
            minlength: 8,
            maxlength: 8,
        },
        emp_id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            minlength: 5
        },
        password: {
            type: String,
            minlength: 8
        },
        name: {
            type: String
        },
        school: {
            type: ObjectId,
            ref: "School"
        }
    }
)

module.exports = mongoose.model("Principal", principalSchema);