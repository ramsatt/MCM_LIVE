import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountticketdetailsComponent } from './accountticketdetails.component';

describe('AccountticketdetailsComponent', () => {
  let component: AccountticketdetailsComponent;
  let fixture: ComponentFixture<AccountticketdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountticketdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountticketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
