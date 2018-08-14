import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccmapComponent } from './accmap.component';

describe('AccmapComponent', () => {
  let component: AccmapComponent;
  let fixture: ComponentFixture<AccmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
