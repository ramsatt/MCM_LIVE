import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedrequestComponent } from './raisedrequest.component';

describe('RaisedrequestComponent', () => {
  let component: RaisedrequestComponent;
  let fixture: ComponentFixture<RaisedrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
