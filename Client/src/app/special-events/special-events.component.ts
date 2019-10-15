import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents : Array<any>=[];

  constructor(private _event : EventService,private _router : Router) { }

  ngOnInit() {
    console.log("getSpecialEvents...");
    this._event.getSpecialEvents().subscribe((res)=>{
      console.log("response : ",res);
      this.specialEvents=res.data;
    },(err)=>{
      console.log("error is : ",err);
      if(err instanceof HttpErrorResponse)
      {
        if(err.status===401)
        {
          this._router.navigate(["/login"]);
        }
      }
    });
  }
}
