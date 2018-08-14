import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupUsersComponent } from './sup-users.component';

describe('SupUsersComponent', () => {
  let component: SupUsersComponent;
  let fixture: ComponentFixture<SupUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
