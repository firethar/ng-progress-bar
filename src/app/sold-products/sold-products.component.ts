import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.scss']
})
export class SoldProductsComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getSoldProducts().pipe(
    map(val => val.data)
  );
  targetValue$: Observable<number> = this.productService.getSoldProducts().pipe(
    map(val => val.totalValue)
  );
  progress$: Observable<number> = this.productService.getProgressValue();

  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

}
