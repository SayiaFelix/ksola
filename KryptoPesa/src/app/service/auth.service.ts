import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "https://cryptopesa.herokuapp.com/CryptoApp/Onboard/Save"
  private _otpUrl = " https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code= "
  private _loginUrl = "https://cryptopesa.herokuapp.com/CryptoApp/Onboard/auth/login"


  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  registerUser(User: Data) {
    return this.http.post<any>(this._registerUrl, User, { observe: 'response' })
  }

  requestOtp(Otp: any) {
    return this.http.get<any>(`https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code=${Otp}`)
  }

  loginUser(User: Data) {
    return this.http.post<any>(this._loginUrl, User,{ observe: 'response' })
  }
}
