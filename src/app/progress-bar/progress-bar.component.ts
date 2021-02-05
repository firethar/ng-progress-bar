import { Component, OnInit } from '@angular/core';

import { SoldProducts } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  progressValue: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getSoldProducts();
  }

  processData(soldProducts: SoldProducts):void {
    let total: number = 0 ;
    soldProducts.totalValue;
    soldProducts.data.forEach( product => {
      return total += product.value;
    });

    this.showProgress(this.calculateProgress(total, soldProducts.totalValue));
  }

  getSoldProducts(): void {
    this.productService.getSoldProducts()
      .subscribe(val => this.processData(val));
  }

  calculateProgress(total: number, targetValue: number): number {
    const calculatedProgress = Math.round(100 * total / targetValue);
    if (calculatedProgress < 0 ) {
      return 0;
    } else {
      return calculatedProgress > 100 ? 100 : calculatedProgress;
    }
  }

  showProgress(value: number): void {
    this.progressValue = value;
  }

}
