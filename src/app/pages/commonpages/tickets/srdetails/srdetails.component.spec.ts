import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrdetailsComponent } from './srdetails.component';

describe('SrdetailsComponent', () => {
  let component: SrdetailsComponent;
  let fixture: ComponentFixture<SrdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
