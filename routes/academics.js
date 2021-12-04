const express = require("express");
const router = express.Router();
const { addAcademicInfo, addAttendanceInfo, getAcademicInfo, getStudentsInClass, getAcademicInfoSchoolYearClass } = require("../controllers/academics");

router.post("/info/add", addAcademicInfo);
router.post("/attendance/add", addAttendanceInfo);
router.get("/info/get/single/:student_id/:year", getAcademicInfo);
router.get("/class/students/:school_id/:class_num/:year", getStudentsInClass);
router.get("/info/get/school/class/year/", getAcademicInfoSchoolYearClass);

module.exports = router;