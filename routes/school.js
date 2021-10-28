const express = require("express");
const router = express.Router();
const { addSchool, listSchools, listStudentsBySchool } = require("../controllers/school");

router.post("/add", addSchool);
router.get("/list", listSchools);
router.get("/students/:school_id", listStudentsBySchool)

module.exports = router;