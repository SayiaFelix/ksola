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

  private _registerUrl = "http://localhost:3000/users/"
  constructor(private http:HttpClient) { }


  registerUser(RegisterUser: any){
    return this.http.post<any>(this._registerUrl,RegisterUser)  
  }

  loginUser(loginUser: any){
    return this.http.get<any>(this._registerUrl,loginUser)  
  }
}
