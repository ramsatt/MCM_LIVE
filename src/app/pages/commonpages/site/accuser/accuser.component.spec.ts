import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuserComponent } from './accuser.component';

describe('AccuserComponent', () => {
  let component: AccuserComponent;
  let fixture: ComponentFixture<AccuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
