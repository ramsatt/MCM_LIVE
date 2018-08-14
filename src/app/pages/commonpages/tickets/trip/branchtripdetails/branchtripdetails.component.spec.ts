import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchtripdetailsComponent } from './branchtripdetails.component';

describe('BranchtripdetailsComponent', () => {
  let component: BranchtripdetailsComponent;
  let fixture: ComponentFixture<BranchtripdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchtripdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchtripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
