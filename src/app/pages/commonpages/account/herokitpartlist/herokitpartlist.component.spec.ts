import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokitpartlistComponent } from './herokitpartlist.component';

describe('HerokitpartlistComponent', () => {
  let component: HerokitpartlistComponent;
  let fixture: ComponentFixture<HerokitpartlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerokitpartlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokitpartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
