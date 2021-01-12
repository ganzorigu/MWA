var express = require("express");
var app = express();
app.set("port", 4000);
var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening on port "+ port);
});
