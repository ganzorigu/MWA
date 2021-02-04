require("./api/data/db");
var express = require("express");
const routes=require("./api/routes");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();

app.set("port", 4000);
//bodyparser urlencoded should false. otherwise body is not shown.

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

    console.log(req.method, req.url);
    next();
});

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api",routes);

const server = app.listen(app.get("port"), function(){
    console.log("Listening to port "+server.address().port);
})