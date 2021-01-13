const express = require("express");
const app = express();
const routes = require("./api/routes");
app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// add, multiply two numbers 
app.use("/numbers", routes);

let server = app.listen(app.get("port"), function(){
    console.log("Listening to ports: " + app.get("port"));
});