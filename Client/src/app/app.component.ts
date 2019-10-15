import { Component } from '@angular/core';
import { AuthService } from './login/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping';
  constructor(private _authService : AuthService, private router: Router){}

  onActivate(event){
    // alert(event);
  }

  logout(){
    this._authService.logout();
  }

}
