var express = require("express");
var path = require("path");
const routes=require("./route/route");
const app = express();

app.set("port", 4000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port "+server.address().port);
})