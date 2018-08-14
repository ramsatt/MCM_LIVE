import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountusersComponent } from './accountusers.component';

describe('AccountusersComponent', () => {
  let component: AccountusersComponent;
  let fixture: ComponentFixture<AccountusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
