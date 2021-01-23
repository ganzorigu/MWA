const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.skillsGetAll = function(req, res) {
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job){
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
        } else {
            response.message = job.skills;
        }        
        res.status(response.status).json(response.message);
    })
}

module.exports.skillsGetOne = function(req,res) {
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    Job.findOne({"_id" : jobId, "skills._id" : skillId}, function(err, job) {
        const response = {
            status : 200,
            message : job
        };
        if (err){
            response.status = 500;
            response.message = {"message" : "System error"};
        } else if (!job) {
            response.status = 404;
            response.message = {"message" : "job not found"};
        } else {
            response.message = job.skills.id(skillId);
        }        
        res.status(response.status).json(response.message);
    })
}

module.exports.skillsAddOne = function(req,res) {
    const jobId = req.params.jobId;
    
    
    if (!req.body.skill || !req.body.description) {
        res.status(400).json({"message" : "fields are empty"});
        return;
    }

    Job.updateOne(
        {"_id" : jobId},
        {$push : {
            skills : {
                        skill : req.body.skill,
                        description :req.body.description
                    }
        }},
        function(err, doc) {
            const response = {
                status : 200,
                message : {"message" : "added"}
            };
            if (err){
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!doc) {
                response.status = 404;
                response.message = {"message" : "job not found"};
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = "job skill not added";
                }
            }       
            res.status(response.status).json(response.message);
        }
    )
}

module.exports.skillsUpdateOne = function(req,res) {
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;

    if (!req.body.skill || !req.body.description) {
        res.status(400).json({"message" : "fields are empty"});
        return;
    }

    Job.updateOne(
        {"_id" : jobId, "skills._id" : skillId},
        {
            $set : {
                "skills.$.skill" : req.body.skill,
                "skills.$.description" : req.body.description
            }
        },
        function(err, doc){
            const response = {
                status : 200,
                message : {"message" : "updated"}
            };
            if (err){
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!doc) {
                response.status = 404;
                response.message = {"message" : "job not found"};
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = "job skill not modified";
                }
            }       
            res.status(response.status).json(response.message);
        }
    )
}

module.exports.skillsDeleteOne = function(req,res) {
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    Job.updateOne(
        {"_id" : jobId},
        {
            $pull : {
                skills : {"_id" : skillId}
            }
        },
        function(err, doc){
            const response = {
                status : 200,
                message : {"message" : "deleted"}
            };
            if (err){
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!doc) {
                response.status = 404;
                response.message = {"message" : "job not found"};
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = "job skill not deleted";
                }
            }       
            res.status(response.status).json(response.message);
        }
    )
}
