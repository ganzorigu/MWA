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
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'faculty', component: FacultyComponent },  
  { path: 'scan', component: ScanComponent }  
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
    QrcompComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
