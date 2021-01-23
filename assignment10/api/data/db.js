const mongoose = require("mongoose");
require("./job-model");
const dbUrl = "mongodb://localhost:27017/jobsDB";
mongoose.set("useFindAndModify", false);
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("connected", function(){
    console.log("connected to db:", dbUrl);
});

db.on("error", console.error.bind(console, "Mongodb connection error"));