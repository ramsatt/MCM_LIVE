import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedrequestComponent } from './receivedrequest.component';

describe('ReceivedrequestComponent', () => {
  let component: ReceivedrequestComponent;
  let fixture: ComponentFixture<ReceivedrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
