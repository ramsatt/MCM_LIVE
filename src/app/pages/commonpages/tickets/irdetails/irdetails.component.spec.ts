import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrdetailsComponent } from './irdetails.component';

describe('IrdetailsComponent', () => {
  let component: IrdetailsComponent;
  let fixture: ComponentFixture<IrdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
