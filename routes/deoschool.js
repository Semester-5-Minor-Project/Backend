const express = require("express");
const router = express.Router();

const { addDeo, getDeo } = require("../controllers/deo");

router.post("/add", addDeo);
router.get("/get/:username/:password", getDeo);

module.exports = router;