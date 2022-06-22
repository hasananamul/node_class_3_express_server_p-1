const express = require("express");
const {getStudents, getSingleStudent, postRequest, updateRequest, deleteRequest} = require("../controllers/contolerStudents");
const router = express.Router();


// Students Routers

// router.get( "/", getStudents)
// router.get("/:id",getSingleStudent)
// router.post("/", postRequest)
// router.put("/:id",updateRequest)
// router.patch("/:id",updateRequest)
// router.delete("/:id",deleteRequest)

// Advanced routing system for students
router.route('/').get(getStudents).post(postRequest);
router.route("/:id").get(getSingleStudent).put(updateRequest).patch(updateRequest).delete(deleteRequest);

module.exports = router;