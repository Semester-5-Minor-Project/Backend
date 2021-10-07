const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const dseutSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 8
        },
        password: {
            type: String,
            minlength: 8
        }
    }
)

module.exports = mongoose.model("DSEUT", dseutSchema);