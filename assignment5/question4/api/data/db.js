const mongoose = require('mongoose');
const mongodb = "mongodb://localhost:27017/SchoolDB";

require("./student-model");

mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('connected', function(){
    console.log("mongodb connected");
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));