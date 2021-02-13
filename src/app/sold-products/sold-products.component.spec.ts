import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockData } from 'src/mocks/mock-data';
import { SoldProducts } from '../product';
import { ProductService } from '../product.service';

import { SoldProductsComponent } from './sold-products.component';

describe('SoldProductsComponent', () => {
  let component: SoldProductsComponent;
  let fixture: ComponentFixture<SoldProductsComponent>;
  let mockProductsService: ProductService;
  let SOLD_PRODUCTS: SoldProducts; 

  beforeEach( () => {
    SOLD_PRODUCTS = mockData;

    mockProductsService = jasmine.createSpyObj(['productsData$','calculateProgress']);
    mockProductsService.productsData$ = of(SOLD_PRODUCTS);

    TestBed.configureTestingModule({
      declarations: [ 
        SoldProductsComponent
      ],
      providers: [
        { provide: ProductService, useValue: mockProductsService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(SoldProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
