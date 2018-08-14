import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketstatusComponent } from './ticketstatus.component';

describe('TicketstatusComponent', () => {
  let component: TicketstatusComponent;
  let fixture: ComponentFixture<TicketstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
