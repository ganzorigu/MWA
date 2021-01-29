var mongoose = require("mongoose");

//text which creates qr code is studentId + secret key.
// secret key is hardcoded.
var qrSchema = new mongoose.Schema({
    studentId: String,
    qrText: String
});

mongoose.model("QrModel", qrSchema, "Qrs");