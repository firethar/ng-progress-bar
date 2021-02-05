import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SoldProducts } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'https://private-anon-cfb1043af1-swoproducts.apiary-mock.com/soldProducts'; 

  constructor(private http: HttpClient) { }

  /** GET soldProducts from the server */
  getSoldProducts(): Observable<SoldProducts> {
    return this.http.get<SoldProducts>(this.productsUrl);
  }

}
