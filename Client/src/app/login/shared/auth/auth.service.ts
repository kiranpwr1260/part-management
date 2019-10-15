import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl : string="http://localhost:3000/register"
  loginUrl : string="http://localhost:3000/login"

  constructor(private _http : HttpClient,private _router : Router) { }

  registerUser(obj) : Observable<any>
  {
    return this._http.post(this.registerUrl,obj);
  }

  loginUser(obj) : Observable<any>
  {
    return this._http.post(this.loginUrl,obj);
  }

  loggedIn() : boolean
  {
    return !!localStorage.getItem("token");
  }

  getToken()
  {
    return localStorage.getItem("token");
  }

  logout()
  {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
}
