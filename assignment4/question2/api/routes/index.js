var express = require("express");
const controllerStudents = require("../controllers/student-controller");
var router = express.Router();

router.route("/students").get(controllerStudents.studentGetAll);
router.route("/students/:studentId").get(controllerStudents.studentGetOne);
router.route("/students/:studentId/addresses").get(controllerStudents.studentAddressGetAll);
router.route("/students/:studentId/addresses/:addressId").get(controllerStudents.studentAddressGetOne);
module.exports = router;