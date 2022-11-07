import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {


otp!: string; showOtpComponent = true; 
@ViewChild("ngOtpInput", { static: false }) 
ngOtpInput: any; config = { allowNumbersOnly: true, length: 4, 
  isPasswordInput: false, disableAutoFocus: false, placeholder: "*", 
  inputStyles: { width: "50px", height: "50px", }, }; 

  constructor() { }

  ngOnInit(): void {
  }

  onOtpChange(otp:any){}

}
