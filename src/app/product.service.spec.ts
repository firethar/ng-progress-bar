import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { SoldProducts } from './product';

import { ProductService } from './product.service';
import { mockData } from '../mocks/mock-data';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  const URL = `${environment.baseURL}/soldProducts`;
  const productsData: SoldProducts = mockData;

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
    service.productsData$.subscribe(products => {
      expect(req.request.method).toBe("GET");
      expect(products.data.length).toEqual(3);
    });
    //httpTestingController mocks requests
    const req = httpTestingController.expectOne(URL);
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
