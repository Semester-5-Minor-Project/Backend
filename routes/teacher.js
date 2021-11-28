const express = require("express");
const router = express.Router();
const { addTeacher, listTeachersBySchool, assignCourses, removeCourses, listCourses } = require("../controllers/teacher");

router.post("/add", addTeacher);
router.get("/get/:school_id", listTeachersBySchool);
router.post("/course/assign", assignCourses);
router.post("/course/remove", removeCourses);
router.get("/course/list", listCourses)

module.exports = router;