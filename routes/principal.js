const express = require("express");
const router = express.Router();
const { addPrincipal, listPrincipals } = require("../controllers/principal");

router.post("/add", addPrincipal);
router.get("/list", listPrincipals);

module.exports = router;