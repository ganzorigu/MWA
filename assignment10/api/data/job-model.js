const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        skill : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        }
    }
);

const locationSchema = new mongoose.Schema(
    {
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        }
    }
);


const jobSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        salary : {
            type : Number,
            required : true
        },
        location : locationSchema,
        description : {
            type : String,
            required : true
        },
        experience : {
            type : String,
            required : true
        },
        skills : [skillSchema],
        postDate : {
            type : String,
            required : true
        }

    }
);

mongoose.model("Job", jobSchema, "Jobs");