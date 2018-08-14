import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetechnicianComponent } from './createtechnician.component';

describe('CreatetechnicianComponent', () => {
  let component: CreatetechnicianComponent;
  let fixture: ComponentFixture<CreatetechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
