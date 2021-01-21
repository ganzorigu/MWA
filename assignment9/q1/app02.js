require("./api/data/db.js");
//require("./api/data/dbconnection").openConnection();
var bodyParser = require('body-parser');
var express = require("express");
var path = require("path");
var routes = require("./api/routes");


const app = express();
app.set("port", 4000);

app.use(function(req, res, next) {    
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api", routes);

// app.get("/file", function(req, res) {
//     console.log("File requested");
//     console.log("__dirname"+__dirname);
//     res.status(200).sendFile(path.join(__dirname, "app13.js"));
// })


// app.get("/", function(req,res){
//     console.log("get home page");
//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
// });

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port "+server.address().port);
})