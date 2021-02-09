import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from '../product.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

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
        SoldProductsComponent,
        ProgressBarComponent
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

  it('should get products$ Observable', (done) => {
    component.products$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should get targetValue$ Observable', (done) => {
    component.targetValue$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

});
