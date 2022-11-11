import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://cryptopesa.herokuapp.com/CryptoApp/Onboard/Save"
  private _otpUrl = " https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code= "
  private _loginUrl = "https://cryptopesa.herokuapp.com/CryptoApp/Onboard/Save"
 

  constructor(private http:HttpClient) { }


  registerUser(User: any){
    return this.http.post<any>(this._registerUrl,User)  
  }

  requestOtp(user:any){
     return this.http.get<any>(this._otpUrl,user)  
  }

  loginUser(loginUser: any){
    return this.http.get<any>(this._registerUrl,loginUser)  
  }
}
