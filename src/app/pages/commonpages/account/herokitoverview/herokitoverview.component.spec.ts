import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokitoverviewComponent } from './herokitoverview.component';

describe('HerokitoverviewComponent', () => {
  let component: HerokitoverviewComponent;
  let fixture: ComponentFixture<HerokitoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokitoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokitoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
