import { environment } from './../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router = inject(Router)

  userData: any = null;




  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }


  saveUserData(): any {
    if (localStorage.getItem('UserToken') !== null) {
      return this.userData = jwtDecode(localStorage.getItem('UserToken')!)
    }
  };
  logOut(): void {
    localStorage.removeItem('UserToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
  setVerifyEmail(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  setVerifyCode(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  setResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}




