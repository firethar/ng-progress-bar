import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from '../product.service';

import { SoldProductsComponent } from './sold-products.component';

describe('SoldProductsComponent', () => {
  let component: SoldProductsComponent;
  let fixture: ComponentFixture<SoldProductsComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [ 
        SoldProductsComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('service should be injected', () => {
    expect(service).toBeTruthy();
  });

});
