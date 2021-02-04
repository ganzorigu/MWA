import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcomp',
  templateUrl: './qrcomp.component.html',
  styleUrls: ['./qrcomp.component.css']
})
export class QrcompComponent implements OnInit {
  public myAngularxQrCode: string = null;
  constructor () {
    // assign a value
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
  }

}
