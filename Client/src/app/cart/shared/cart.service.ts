import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http : HttpClient) { }
  getOrders() : Observable<any>
  {
    return this._http.get(environment.baseURL+'/order');
  }

  createOrder(ord:any) : Observable<any>
  {
    return this._http.post(environment.baseURL+'/order',ord);
  }
}
