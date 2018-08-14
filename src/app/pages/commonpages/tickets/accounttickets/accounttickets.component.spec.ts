import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountticketsComponent } from './accounttickets.component';

describe('AccountticketsComponent', () => {
  let component: AccountticketsComponent;
  let fixture: ComponentFixture<AccountticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
