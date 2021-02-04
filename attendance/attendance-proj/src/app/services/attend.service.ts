import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../model/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendService {

  constructor(private http: HttpClient) { }

  onGet(id: string) : Observable<Attendance[]> {    
    return this.http.get<Attendance[]>('http://localhost:4000/api/searchAttendance?id='+id);
    // return this.students;
  }

}
