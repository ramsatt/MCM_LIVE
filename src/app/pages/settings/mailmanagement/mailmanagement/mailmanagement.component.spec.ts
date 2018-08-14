import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailmanagementComponent } from './mailmanagement.component';

describe('MailmanagementComponent', () => {
  let component: MailmanagementComponent;
  let fixture: ComponentFixture<MailmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
