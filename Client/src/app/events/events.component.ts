import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events : Array<any>=[];
  constructor(private _event : EventService) { }

  ngOnInit() {
    console.log("getEvents...");
    this._event.getEvents().subscribe((response)=>{
      console.log("response : ",response);
      this.events=response.data;
    },(error)=>{
      console.log("error : ",error);
    });
  }
}
