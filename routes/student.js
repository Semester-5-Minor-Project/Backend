const express = require("express");
const router = express.Router();
const { addStudent, addBatchStudents, addPhoto } = require("../controllers/student");
const { upload } = require("../controllers/cloudinary");

router.post("/add", upload , addStudent);
router.post("/addbatch", addBatchStudents);
router.post("/addphoto", upload, addPhoto);

module.exports = router;