# Usage of rest API.

* GET all students
http://localhost:4000/api/students

* GET single student
http://localhost:4000/api/students/:studentId

* GET all addresses of student
http://localhost:4000/api/students/:studentId/addresses

* GET single address of student
http://localhost:4000/api/students/:studentId/addresses/:addressId
---

## Student, address schema and relationship

 ```
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
    address : {type: [addressSchema]}
});
```
---
SchoolDB bson file and json file are inside "./mongodb dump files":
 - dump
 - out.json

COMMAND to restore the SchoolDB database:
"mongorestore dump"