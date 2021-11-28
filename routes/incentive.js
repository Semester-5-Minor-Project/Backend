const express = require("express");
const router = express.Router();
const { addBatchIncentives, addIncentive } = require("../controllers/incentive.js");

router.post("/single", addIncentive);
router.post("/batch", addBatchIncentives)

module.exports = router;