import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventUrl : string="http://localhost:3000/events";
  specialEventUrl : string="http://localhost:3000/specialEvents";

  constructor(private _http : HttpClient) { }

  getEvents() : Observable<any>
  {
    return this._http.get(environment.baseURL+'/events');
  }

  getSpecialEvents() : Observable<any>
  {
    return this._http.get(this.specialEventUrl);
  }

  loggedIn() : boolean
  {
    return !!localStorage.getItem("token");
  }
}
