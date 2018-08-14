import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickservicereqComponent } from './tickservicereq.component';

describe('TickservicereqComponent', () => {
  let component: TickservicereqComponent;
  let fixture: ComponentFixture<TickservicereqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickservicereqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickservicereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
