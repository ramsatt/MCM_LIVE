import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripoverviewComponent } from './tripoverview.component';

describe('TripoverviewComponent', () => {
  let component: TripoverviewComponent;
  let fixture: ComponentFixture<TripoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
