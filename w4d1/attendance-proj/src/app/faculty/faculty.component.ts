import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  showAddForm = false;
  constructor() { }  
  navValue = 'Add Student';
  ngOnInit(): void {
  }  

}
