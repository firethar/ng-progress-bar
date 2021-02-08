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

  products$: Observable<Product[]> = this.productService.productsData$.pipe(
    map(soldProducts => soldProducts.data)
  );
  targetValue$: Observable<number> = this.productService.productsData$.pipe(
    map(soldProducts => soldProducts.totalValue)
  );
  progress$: Observable<number> = this.productService.progressValue$;

  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

}
