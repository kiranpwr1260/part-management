import { Component } from '@angular/core';
import { AuthService } from './login/shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopping';
  constructor(private _authService : AuthService){}

  onActivate(event){
    console.log("------------------- : ",event);
    // alert(event);
  }

}
