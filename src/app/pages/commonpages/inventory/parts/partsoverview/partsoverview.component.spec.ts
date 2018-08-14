import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsoverviewComponent } from './partsoverview.component';

describe('PartsoverviewComponent', () => {
  let component: PartsoverviewComponent;
  let fixture: ComponentFixture<PartsoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
