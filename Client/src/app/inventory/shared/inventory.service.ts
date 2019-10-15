import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  constructor(private _http : HttpClient) { }
  
  updateInv(id,data): Observable<any> {
    return this._http.put(environment.baseURL+`/inventory/${id}`,data);
  }
  getInv() : Observable<any>
  {
    return this._http.get(environment.baseURL+'/inventory');
  }

  createInv(INV:any) : Observable<any>
  {
    return this._http.post(environment.baseURL+'/inventory',INV);
  }
}
