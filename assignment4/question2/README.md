## Usage of rest API.

* GET all students 
http://localhost:4000/api/students

* GET single student 
http://localhost:4000/api/students/101

* GET all addresses of student 
http://localhost:4000/api/students/101/addresses

* GET single address of student 
http://localhost:4000/api/students/101/addresses/0

**SchoolDB** bson file and json file are inside "mongodb dump files":
 * dump
 * out.json

COMMAND to restore the SchoolDB database:
"mongorestore dump"