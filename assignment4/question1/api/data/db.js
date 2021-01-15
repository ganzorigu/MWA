const mongoose = require("mongoose");
const mongodb = "mongodb://localhost:27017/meanGames";
require("./games-model.js");
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// mongoose.connection.on("connected", function(){
//     console.log("Mongoose connected to "+dbURL);
// });



// mongoose.connection.on("disconnected", function(){
//     console.log("Mongoose disconnected");
// });

// mongoose.connection.on("error", function(err){
//     console.log("Mongoose err:"+err);
// });

// process.on("SIGINT", function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by ctrl+c");
//     });
// });

// process.once("SIGUSR2", function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by application restart");
//         process.kill(process.pid, "SIGUSR2");
//     });
// });

