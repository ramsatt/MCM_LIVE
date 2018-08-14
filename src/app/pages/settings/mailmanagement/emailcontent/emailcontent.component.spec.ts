import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailcontentComponent } from './emailcontent.component';

describe('EmailcontentComponent', () => {
  let component: EmailcontentComponent;
  let fixture: ComponentFixture<EmailcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
