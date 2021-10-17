const express = require("express");
const router = express.Router();
const { addSchool } = require("../controllers/school");

router.post("/add", addSchool);

module.exports = router;