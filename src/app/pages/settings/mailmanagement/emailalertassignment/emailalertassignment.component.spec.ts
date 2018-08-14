import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailalertassignmentComponent } from './emailalertassignment.component';

describe('EmailalertassignmentComponent', () => {
  let component: EmailalertassignmentComponent;
  let fixture: ComponentFixture<EmailalertassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailalertassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailalertassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
