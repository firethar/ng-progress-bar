import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SoldProducts } from './product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  const productsData: SoldProducts = {
    "data": [
      {
        "label": "Product 1",
        "value": 100
      },
      {
        "label": "Product 2",
        "value": 125
      },
      {
        "label": "Product 3",
        "value": 200
      }
    ],
    "totalValue": 1000 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate progress to be 0 when negative totalValue', () => {
    const progressValue = service.calculateProgress(productsData, -10);
    expect(progressValue).toEqual(0);
  });

  it('should calculate progress to be 0 when totalValue 0 ', () => {
    const progressValue = service.calculateProgress(productsData, 0);
    expect(progressValue).toEqual(0);
  });
  
  it('should calculate progress to be less than 100 or equal when totalValue is lower then totalSoldProductsValue', () => {
    const progressValue = service.calculateProgress(productsData, 100);
    expect(progressValue).toEqual(100);
  });

});
