const express = require("express");
const router = express.Router();
const { getAdmin, addDse } = require("../controllers/superadmin"); 

router.get("/:username/:password", getAdmin);
router.post("/create/dse", addDse);

module.exports = router;