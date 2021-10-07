const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
    {
        scheme_id: String,
		scheme_name: String
    }
)

module.exports = mongoose.model("Scheme", schemeSchema);