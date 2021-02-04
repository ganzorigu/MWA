import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[];
  selectedStudent: Student;
  showDetail = false;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.studentService.onGet().subscribe((data) => {
      // this.students=[];
      // for (let element of data) {
      //   this.students.push({
      //     firstname : element.firstname,
      //     lastname : element.lastname,
      //     studentId : element.studentId,
      //     username : element.username,
      //     firstname : element.firstname,

      //   })
      // }
      this.students = data || [];
      console.log("list", data);
    }
      // console.log("data", this.students);
    );
  }



  setSelected(student: Student) {
    console.log("selected");
    this.selectedStudent = student;
    this.showDetail = true;
  }

  removeStudent(studentId: string) {
    console.log("remove student");
    this.studentService.onDelete(studentId);
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].studentId == studentId) {
        this.students.splice(i, 1);
      }
    }
  }


}
