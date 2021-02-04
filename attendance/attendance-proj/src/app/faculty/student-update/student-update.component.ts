import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  student: Student = new Student();

  id: string;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.studentService.onGetStudent(this.id).subscribe(data => {
      this.student = data;
      // console.log(data);        
      // this.student = data[0];
      // this.student.firstname = data.firstname;
      // this.student.lastname = data.lastname;
      // this.student.username = data.username;
      // this.student.studentId = data.studentId;
      // this.student.password = data.password;
      // this.student.secretKey = data.secretKey;
      
    });            
  }

  onUpdateStudent(postData: {firstname: string; 
                        lastname: string;                          
                        username: string;
                        password: string;
                        passwordRepeat : string;
                        studentId: string;
                        secretKey: string
                      }
  ){
    this.student.firstname = postData.firstname;
    this.student.lastname = postData.lastname;
    this.student.username = postData.username;
    this.student.password = postData.password;
    this.student.studentId = postData.studentId;
    this.student.secretKey = postData.secretKey;

    console.log(this.student);

    this.studentService.onUpdate(this.student, this.student.studentId);
    this.router.navigate(['/faculty']);
  }
}
