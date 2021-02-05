import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.scss']
})
export class SoldProductsComponent implements OnInit {

  products: Product[] = [];
  targetValue: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getTargetValue();
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductsData()
      .subscribe(products => this.products = products);
  }

  getTargetValue(): void {
    this.productService.getSoldProductsTargetValue()
      .subscribe(val => this.targetValue = val);
  }
}
