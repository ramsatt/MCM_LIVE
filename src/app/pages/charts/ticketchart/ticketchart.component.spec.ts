import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketchartComponent } from './ticketchart.component';

describe('TicketchartComponent', () => {
  let component: TicketchartComponent;
  let fixture: ComponentFixture<TicketchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
