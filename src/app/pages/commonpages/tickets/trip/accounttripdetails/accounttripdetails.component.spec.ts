import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccounttripdetailsComponent } from './accounttripdetails.component';

describe('AccounttripdetailsComponent', () => {
  let component: AccounttripdetailsComponent;
  let fixture: ComponentFixture<AccounttripdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccounttripdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccounttripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
