import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { SoldProducts } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = `${environment.baseURL}/soldProducts`; 

  constructor(private http: HttpClient) { }

  /** GET soldProducts from the server */
  getSoldProducts(): Observable<SoldProducts> {
    return this.http.get<SoldProducts>(this.productsURL);
  }

}
