require("./api/data/db");
var express = require("express");
const routes=require("./api/routes");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

app.set("port", 4000);
//bodyparser urlencoded should false. otherwise body is not shown.
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/api",routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port "+server.address().port);
})