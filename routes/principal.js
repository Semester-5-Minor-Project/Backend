const express = require("express");
const router = express.Router();
const { addPrincipal, getPrincipal, listPrincipals } = require("../controllers/principal");

router.post("/add", addPrincipal);
router.get("/list", listPrincipals);
router.get("/get/:username/:password", getPrincipal);

module.exports = router;