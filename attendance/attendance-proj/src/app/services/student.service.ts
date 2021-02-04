import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students : Student[] = [
    // {
    //   firstname : 'John',
    //   lastname : 'Doe',
    //   studentId : '456471',
    //   username : 'john',
    //   password : 'john2021',
    //   secretKey : 'secret'
    // },
    // {
    //   firstname : 'Michael',
    //   lastname : 'Johnson',
    //   studentId : '456472',
    //   username : 'mike',
    //   password : 'mike2021',
    //   secretKey : 'secret'
    // },
    // {
    //   firstname : 'Dwight',
    //   lastname : 'Schrute',
    //   studentId : '456411',
    //   username : 'dwight',
    //   password : 'dwight2021',
    //   secretKey : 'secret'
    // }
  ];
  constructor(private http: HttpClient) {
    this.onGet();     
  }

  onGet() : Observable<Student[]> {    
    return this.http.get<Student[]>('http://localhost:4000/api/students');
    // return this.students;
  }

  onAdd(student: Student) {
    this.http.post("http://localhost:4000/api/students", student)
      .subscribe(data => {
        console.log("create successful", data);
        this.students.push(student);
      }
    );
    //this.students.push(student);
  }

  onGetStudent(studentId: string): Observable<Student> {
    return this.http.get<Student>("http://localhost:4000/api/students/"+studentId);    

    //return this.students.find(x=>x.studentId==studentId);
  }


  onDelete(studentId: string) {
    this.http.delete("http://localhost:4000/api/students/"+studentId)
      .subscribe(data => {
        console.log("delete successful", data);        
    });

    // for (let i=0; i< this.students.length; i++) {
    //   if (this.students[i].studentId==studentId) {
    //     this.students.splice(i,1);
    //   }
    // }
  }

  onUpdate(student: Student, id: string) {
    console.log("updated student", student);
    this.http.put("http://localhost:4000/api/students/"+id, student)
      .subscribe(data => console.log("update successful", data));
    // for (let i=0; i< this.students.length; i++) {
    //   if (this.students[i].studentId==id) {
    //     this.students[i] = student;
    //   }
    // }
  }


}
