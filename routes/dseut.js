const express = require("express");
const router = express.Router();
const { getDSE } = require("../controllers/dseut");

router.get("/", getDSE);

module.exports = router;