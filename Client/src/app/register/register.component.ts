import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  registerObj : Object={};

  constructor(private _auth : AuthService,private _router : Router, private fb : FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register()
  {
    if(this.registerForm.invalid){
      this.toastr.error('invalid form')
      return;
    }
    this._auth.registerUser(this.registerForm.value).subscribe((res)=>{
      if(res.result)
      {
        this._router.navigate(["/login"]);
      }
    },(error)=>{
    });
  }

}
