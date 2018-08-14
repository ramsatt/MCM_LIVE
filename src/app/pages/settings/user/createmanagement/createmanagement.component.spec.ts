import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemanagementComponent } from './createmanagement.component';

describe('CreatemanagementComponent', () => {
  let component: CreatemanagementComponent;
  let fixture: ComponentFixture<CreatemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
