import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignsupplierComponent } from './assignsupplier.component';

describe('AssignsupplierComponent', () => {
  let component: AssignsupplierComponent;
  let fixture: ComponentFixture<AssignsupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignsupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
