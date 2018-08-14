import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsiteoverviewComponent } from './adminsiteoverview.component';

describe('AdminsiteoverviewComponent', () => {
  let component: AdminsiteoverviewComponent;
  let fixture: ComponentFixture<AdminsiteoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsiteoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsiteoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
