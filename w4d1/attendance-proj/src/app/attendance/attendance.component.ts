import { AttendService } from './../services/attend.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as xlsx from 'xlsx';
import { Attendance } from '../model/attendance.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  searchId: string = '';
  attendances: Attendance[] = [];

  constructor(private attendService: AttendService) { }

  ngOnInit(): void {
    this.getAttendance();
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  getAttendance() {
    console.log(this.searchId);
    this.attendService.onGet(this.searchId).subscribe((data) => {

      this.attendances = data || [];
      console.log("list", data);
    }
    );
  }


}
