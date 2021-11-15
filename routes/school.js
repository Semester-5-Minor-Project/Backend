const express = require("express");
const router = express.Router();
const { addSchool, listSchools, listCompRegStudentsBySchool, listIncompRegStudentsBySchool } = require("../controllers/school");

router.post("/add", addSchool);
router.get("/list", listSchools);
router.get("/students/:school_id", listCompRegStudentsBySchool);
router.get("/students/incomplete/:school_id", listIncompRegStudentsBySchool);

module.exports = router;