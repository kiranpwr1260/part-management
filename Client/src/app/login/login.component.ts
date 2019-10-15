import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  loginObj : Object={};

  constructor(private _auth : AuthService,private _router : Router, private fb : FormBuilder,private toastr: ToastrService ) { }

  ngOnInit() {
    if(this._auth.loggedIn()){
      this._router.navigate['/inventory']
    }
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login()
  {
    if(this.loginForm.invalid){
      this.toastr.error('invalid form')
      return;
    }
    this._auth.loginUser(this.loginForm.value).subscribe((res)=>{
      if(res.result)
      {
        localStorage.setItem("token",res.token);
        this._router.navigate(["/inventory"]);
      } else if(!res.result){
        this.toastr.error('invalid Id or Password')
      }
    },(error)=>{
      this.toastr.error(error)
    });
  }

}
