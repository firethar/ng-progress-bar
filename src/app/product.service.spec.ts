import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SoldProducts } from './product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController
  const URL = 'https://private-anon-cfb1043af1-swoproducts.apiary-mock.com/soldProducts';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get productsData$ from URL', () => {
    service.productsData$.subscribe();
    //httpTestingController mocks requests
    const req = httpTestingController.expectOne(URL);
    expect(req.request.method).toBe("GET");
    //fluch provides dummy values as response
    req.flush(productsData);
    
    //to make sure that there are no outstanding requests
    httpTestingController.verify();
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
