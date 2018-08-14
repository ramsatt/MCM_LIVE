import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumanagementComponent } from './menumanagement.component';

describe('MenumanagementComponent', () => {
  let component: MenumanagementComponent;
  let fixture: ComponentFixture<MenumanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
