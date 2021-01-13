module.exports.gamesGetAll = function(req, res) {
    console.log("JSON request received");
    req.status(200);
    res.json({"JsonData" : true});
}