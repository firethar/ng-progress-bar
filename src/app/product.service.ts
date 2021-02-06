import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Product } from './product';
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


  /** GET productsTargetValue from the server */
  getSoldProductsTargetValue(): Observable<any> {
    return this.http.get<SoldProducts>(this.productsURL).pipe(
      map(soldProducts => soldProducts.totalValue),
      catchError(this.handleError('getSoldProductsTargetValue'))
    );
  }

  /** GET productsData from the server */
  getProductsData(): Observable<Product[]> {
    return this.http.get<SoldProducts>(this.productsURL).pipe(
      map(soldProducts => soldProducts.data),
      catchError(this.handleError('getProductsData', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
