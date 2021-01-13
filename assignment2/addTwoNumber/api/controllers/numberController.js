let addTwoNumbers = function(req, res) {
    let operand1 = parseInt(req.params.operand1);
    console.log(req.query);
    let operand2 = 0;
    if (req.query && req.query.operand2) {
        operand2 = parseInt(req.query.operand2);
    }
    let result = operand1+operand2;
    res.status(200).json({"sum" : result});
}

let mulTwoNumbers = function(req, res) {
    let operand1 = parseInt(req.params.operand1);
    console.log(req.query);
    let operand2 = 0;
    if (req.query && req.query.operand2) {
        operand2 = parseInt(req.query.operand2);
    }
    let result = operand1*operand2;
    res.status(200).json({"sum" : result});
}


module.exports.addNumbers = addTwoNumbers;
module.exports.mulTwoNumbers = mulTwoNumbers;