const mongoose = require("mongoose");
require("./book-model");
const dbURL = "mongodb://localhost:27017/library";
mongoose.set('useFindAndModify', false);
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology : true});

const db = mongoose.connection;

db.on("connected", function(){
    console.log("Mongoose connected to: ", dbURL);
})

db.on("error", console.error.bind(console, "Mongodb connection error:"));