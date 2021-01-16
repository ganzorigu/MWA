Usage of rest API.

GET all students
Eg: http://localhost:4000/api/students

GET single student
Eg: http://localhost:4000/api/students/:studentId

GET all addresses of student
Eg: http://localhost:4000/api/students/:studentId/addresses

GET single address of student
Eg: http://localhost:4000/api/students/:studentId/addresses/0

-- made changes to the database schema to following.

const addressSchema = new mongoose.Schema({
    street: {
        type : String
        //required: true
    },
    zipcode: {
        type : String
        //required: true
    },
    city: {
        type : String
        //required : true
    },
    country: {
        type : String
        //required : true
    }
    
});


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gpa: { type: Number, min: 1.0, max: 4.0, required: true},
    //studentId: { type: String, required: true},
    address : {type: [addressSchema]}
});

SchoolDB bson file and json file are inside "mongodb dump files":
 - dump
 - out.json

COMMAND to restore the SchoolDB database:
"mongorestore dump"