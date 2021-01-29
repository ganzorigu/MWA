const mongoose = require("mongoose");
const mongodb = "mongodb://localhost:27017/Attendance";
require("./attendance-model.js");
require("./students-model.js");
require("./qr-model");
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

