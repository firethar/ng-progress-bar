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

  /** GET soldProducts data from the server */
  productsData$: Observable<SoldProducts> = this.http.get<SoldProducts>(this.productsURL).pipe(
    publishReplay(1),
    refCount()
  );

  /** get progress value to display in progress-bar component */
  progressValue$:Observable<number> = this.productsData$.pipe(
    map((productsData: SoldProducts) => {
      return this.calculateProgress(productsData, productsData.totalValue);
    })
  );

  constructor(private http: HttpClient) { }

  calculateProgress(productsData: SoldProducts, targetValue: number): number {
    /** get total value of sold products */
    const total: number = productsData.data.reduce((total:number, product:Product) => {
      return total + product.value;
    }, 0);

    /** calculate progress */
    if (targetValue === 0) {
      return 0;
    }
    const calculatedProgress = Math.round(100 * total / targetValue);

    /** validate progress to be in range 0-100 */
    if (calculatedProgress < 0) {
      return 0;
    } else {
      return calculatedProgress > 100 ? 100 : calculatedProgress;
    }
  }

}
