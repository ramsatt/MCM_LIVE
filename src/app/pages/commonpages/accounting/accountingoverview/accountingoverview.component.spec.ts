import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingoverviewComponent } from './accountingoverview.component';

describe('AccountingoverviewComponent', () => {
  let component: AccountingoverviewComponent;
  let fixture: ComponentFixture<AccountingoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
