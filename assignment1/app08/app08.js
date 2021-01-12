var child_process = require("child_process");

console.log("App started");

var newProcess = child_process.spawn("node", ["computation/_fibonacci.js"], {stdio: "inherit"});
//require("./computation/_fibonacci");
console.log("2: end");