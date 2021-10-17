const mongoose = require("mongoose");

const superSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 5
        },
        password: {
            type: String,
            minlength: 8
        },
    }
)

module.exports = mongoose.model("Superadmin", superSchema);