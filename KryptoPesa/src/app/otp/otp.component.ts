import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {


// otp!: string; showOtpComponent = true; 
@ViewChild("ngOtpInput", { static: false }) 
// ngOtpInput: any; config = { allowNumbersOnly: true, length: 4, 
//   isPasswordInput: false, disableAutoFocus: false, placeholder: "*", 
//   inputStyles: { width: "50px", height: "50px", }, }; 

  otp!:string;
  inputDigitLeft:string='Verify Code';
  btnStatus:string='button_1'
  constructor() { }

  public configOptions={
    length:4,
    inputClass:'digit-otp',
    // containerClass:'d-flex justify-content-between'
  }

  ngOnInit(): void {
  }

  onOtpChange(event:any){
    this.otp=event
    if(this.otp.length < this.configOptions.length){
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " Digits Left";
    }
    if(this.otp.length==this.configOptions.length){
      this.inputDigitLeft ="Let's Go!" ;
      this.btnStatus='auth'
    }
  }

}
