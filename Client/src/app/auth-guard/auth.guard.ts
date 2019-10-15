import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../login/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router : Router,private _authService : AuthService){}

  canActivate() : boolean {
    if(this._authService.loggedIn())
    {
      return true;
    }
    else
    {
      this._router.navigate(["/login"]);
      return false;
    }
  }
  
}
