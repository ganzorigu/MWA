let express = require("express");
let controllerNumbers = require("../controllers/numberController");
let router = express.Router();

router.route("/addNumbers/:operand1")
    .get(controllerNumbers.addNumbers);    

router.route("/mulNumbers/:operand1")
    .get(controllerNumbers.mulTwoNumbers);    

module.exports = router;