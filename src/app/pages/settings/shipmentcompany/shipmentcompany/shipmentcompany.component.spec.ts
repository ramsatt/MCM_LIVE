import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentcompanyComponent } from './shipmentcompany.component';

describe('ShipmentcompanyComponent', () => {
  let component: ShipmentcompanyComponent;
  let fixture: ComponentFixture<ShipmentcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
