const express = require("express");
const router = express.Router();
const { addTeacher, listTeachersBySchool } = require("../controllers/teacher");

router.post("/add", addTeacher);
router.get("/get/:school_id", listTeachersBySchool);

module.exports = router;