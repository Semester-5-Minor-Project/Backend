const express = require("express");
const router = express.Router();
const { addBatchIncentives, addIncentive, getIncentiveInfoSchool } = require("../controllers/incentive.js");

router.post("/single", addIncentive);
router.post("/batch", addBatchIncentives);
router.get("/info/get/school", getIncentiveInfoSchool);

module.exports = router;