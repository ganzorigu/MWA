import { StudentService } from 'src/app/services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  
  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateStudent(postData: {firstname: string; 
                            lastname: string;                          
                            username: string;
                            password: string;
                            passwordRepeat : string;
                            studentId: string;
                            secretKey: string
                          }) {
    console.log(postData);
    let student: Student = {
      firstname : postData.firstname,
      lastname : postData.lastname,
      username : postData.username,
      studentId : postData.studentId,
      password : postData.password,
      secretKey : postData.secretKey
    } 
    this.studentService.onAdd(student);
    this.router.navigate(['/faculty']);
  }
}
