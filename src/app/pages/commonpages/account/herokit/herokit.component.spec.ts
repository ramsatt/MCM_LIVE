import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokitComponent } from './herokit.component';

describe('HerokitComponent', () => {
  let component: HerokitComponent;
  let fixture: ComponentFixture<HerokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
