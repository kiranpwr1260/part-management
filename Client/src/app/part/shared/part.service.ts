import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private _http : HttpClient) { }

  getParts() : Observable<any>
  {
    return this._http.get(environment.baseURL+'/parts');
  }

  createPart(part:any) : Observable<any>
  {
    return this._http.post(environment.baseURL+'/parts',part);
  }
}
