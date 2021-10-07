const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const deoschoolSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 8
        },
        password: {
            type: String,
            minlength: 8
        },
        school: {
            type: ObjectId,
            ref: "School"
        }
    }
)

module.exports = mongoose.model("DEOSchool", deoschoolSchema);