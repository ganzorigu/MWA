const express = require("express");
const app = express();
const path = require("path");
require("./api/data/db.js");
const routes = require("./api/routes");

app.set("port", 4000);

app.use(function(req,res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
    console.log("Listening to port " + server.address().port);
})
