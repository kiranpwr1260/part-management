import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http : HttpClient) { }

  httpGetService(url:string):Observable<any>
  {
    return this._http.get(url);
  }

  httpPostService(url:string,obj:Object):Observable<any>
  {
    return this._http.post(url,obj);
  }

}
