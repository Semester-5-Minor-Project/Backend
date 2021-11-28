const express = require("express");
const router = express.Router();
const { addAcademicInfo, addAttendanceInfo, getAcademicInfo, getStudentsInClass } = require("../controllers/academics");

router.post("/info/add", addAcademicInfo);
router.post("/attendance/add", addAttendanceInfo);
router.get("/info/get/single", getAcademicInfo);
router.get("/class/students/:school_id/:class_num/:year", getStudentsInClass);

module.exports = router;