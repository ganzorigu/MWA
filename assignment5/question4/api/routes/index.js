var express = require("express");
const controllerStudents = require("../controllers/student-controller");
const controllerAddresses = require("../controllers/address-controller");
var router = express.Router();

router.route("/students")
        .get(controllerStudents.studentsGetAll)
        .post(controllerStudents.studentsAddOne);
router.route("/students/:studentId")
        .get(controllerStudents.studentsGetOne)
        .put(controllerStudents.studentsUpdateOne)
        .delete(controllerStudents.studentsDeleteOne);

router.route("/students/:studentId/addresses")
    .get(controllerAddresses.addressesGetAll)
    .post(controllerAddresses.addressesAddOne);

router.route("/student/:studentId/addresses/:addressId")
    .get(controllerAddresses.addressesGetOne)
    .put(controllerAddresses.addressesUpdateOne)
    .delete(controllerAddresses.addressesDeleteOne);



// router.route("/students/:studentId/addresses").get(controllerStudents.studentAddressGetAll);
// router.route("/students/:studentId/addresses/:addressId").get(controllerStudents.studentAddressGetOne);
module.exports = router;