import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Product, SoldProducts } from './product';


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

  getProgressValue(): Observable<number> {
    return this.getSoldProducts().pipe(
      map((productsData: SoldProducts) => {
        const total: number = productsData.data.reduce((total:number, product:Product) => {
          return total + product.value;
        }, 0);
        return this.calculateProgress(total, productsData.totalValue);
      })
    );
  }

  calculateProgress(total: number, targetValue: number): number {
    const calculatedProgress = Math.round(100 * total / targetValue);
    if (calculatedProgress < 0 ) {
      return 0;
    } else {
      return calculatedProgress > 100 ? 100 : calculatedProgress;
    }
  }

}
