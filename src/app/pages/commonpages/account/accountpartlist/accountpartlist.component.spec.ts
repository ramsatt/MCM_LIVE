import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountpartlistComponent } from './accountpartlist.component';

describe('AccountpartlistComponent', () => {
  let component: AccountpartlistComponent;
  let fixture: ComponentFixture<AccountpartlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountpartlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountpartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
