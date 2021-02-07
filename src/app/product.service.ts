import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { SoldProducts } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = `${environment.baseURL}/soldProducts`; 

  productsData$?: Observable<SoldProducts>;

  constructor(private http: HttpClient) { }

  /** GET soldProducts from the server */
  getSoldProducts(): Observable<SoldProducts> {
    // Cache it once if productsData$ value is false
    if (!this.productsData$) {
      this.productsData$ = this.http.get<SoldProducts>(this.productsURL).pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.productsData$;
  }

}
