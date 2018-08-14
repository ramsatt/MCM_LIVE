import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountoverviewComponent } from './accountoverview.component';

describe('AccountoverviewComponent', () => {
  let component: AccountoverviewComponent;
  let fixture: ComponentFixture<AccountoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
