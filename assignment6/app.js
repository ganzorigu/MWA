require("./api/data/db");
const express = require("express");
const routes = require("./api/routes");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 4000);

//bodyparser urlencoded should false. otherwise body is not shown.
app.use(bodyParser.urlencoded({extended: false}));

// middleware, intercepter for displaying data
app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
    console.log("Listening to port at ", app.get("port"));
})