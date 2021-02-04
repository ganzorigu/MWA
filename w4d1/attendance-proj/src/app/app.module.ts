import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './scan/scan.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcompComponent } from './home/qrcomp/qrcomp.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentAddComponent } from './faculty/student-add/student-add.component';
import { StudentListComponent } from './faculty/student-list/student-list.component';
import { FormsModule } from '@angular/forms';
import { StudentDetailComponent } from './faculty/student-detail/student-detail.component';
import { StudentUpdateComponent } from './faculty/student-update/student-update.component';
import { AttendanceComponent } from './attendance/attendance.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'faculty', component: FacultyComponent },  
  { path: 'faculty/add', component: StudentAddComponent },  
  { path: 'faculty/update/:id', component: StudentUpdateComponent },
  { path: 'scan', component: ScanComponent },  
  { path: 'attendance', component: AttendanceComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    FacultyComponent,
    HomeComponent,
    ScanComponent,
    QrcompComponent,
    StudentAddComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentUpdateComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    QRCodeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
