const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.jobsGetAll = function(req, res) {
    Job.find().exec(function(err, jobs){
        const response = {
            status : 200,
            message : jobs
        }
        if (err) {
            response.status = 500;
            response.message = {"message" : "System error"};
        } else if (!jobs) {
            response.status = 404;
            response.message = {"message" : "No Jobs found"};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.jobsGetOne = function(req,res) {
    const jobId = req.params.jobId;
    Job.findById(jobId, function(err, job){
        const response = {
            status : 200,
            message : job
        };
        if (err){
            response.status = 500;
            response.message = "System error";
        } else if (!job) {
            response.status = 404;
            response.message = "job not found";
        } 
        res.status(response.status).json(response.message);
        
    })
}

module.exports.jobsAddOne = function(req,res) {

    if (!req.body.title || !req.body.salary || !req.body.locationCity 
        || !req.body.locationState || !req.body.description || !req.body.experience
        || !req.body.postDate) {                
        res.status(404).json({"message" : "one or more fields are missing"});        
        return;
    } 
    if (isNaN(req.body.salary)){
        res.status(404).json({"message" : "salary should be number"}); 
        return;       
    };    
    Job.create(
        {
            title : req.body.title,
            salary : parseFloat(req.body.salary),
            location : {
                city : req.body.locationCity,
                state : req.body.locationState
            },
            description : req.body.description,
            experience : req.body.experience,
            skills : [],
            postDate : req.body.postDate
        }, function(err, job) {
            const response = {
                "status" : 200,
                "message" : job
            };
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"}
            }
            res.status(response.status).json(job);
        }
    );        
}

module.exports.jobsUpdateOne = function(req,res) {
    if (!req.body.title || !req.body.salary || !req.body.locationCity 
        || !req.body.locationState || !req.body.description || !req.body.experience
        || !req.body.postDate) {                
        res.status(404).json({"message" : "one or more fields are missing"});        
        return;
    } 
    if (isNaN(req.body.salary)){
        res.status(404).json({"message" : "salary should be number"}); 
        return;       
    };    
    const jobId = req.params.jobId;

    Job.updateOne(
        {"_id" : jobId}, 
        {
            $set : {
                title : req.body.title,
                salary : parseFloat(req.body.salary),
                location : {
                    city : req.body.locationCity,
                    state : req.body.locationState
                },
                description : req.body.description,
                experience : req.body.experience,
                skills : [],
                postDate : req.body.postDate
            }
        },
        function(err,doc){
            let response = {
                status : 200,
                message : {"message" : "updated"}
            }
            if (err) {
                response.status = 500;
                response.message = "System error"
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = {"message" : "jobId not found"};
                }
            }
            res.status(response.status).json(response.message);
        }
    )
}

module.exports.jobsDeleteOne = function(req,res) {
    const jobId = req.params.jobId;

    Job.deleteOne({"_id" : jobId}, function(err, doc){
        let response = {
            status : 200,
            message : {"message" : "deleted"}
        }
        if (err) {
            response.status = 500;
            response.message = "System error"
        } else {
            if (doc.nModified == 0) {
                response.status = 404;
                response.message = {"message" : "jobId not found"};
            }
        }
        res.status(response.status).json(response.message);
    });
} 