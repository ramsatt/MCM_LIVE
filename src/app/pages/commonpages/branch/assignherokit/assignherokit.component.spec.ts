import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignherokitComponent } from './assignherokit.component';

describe('AssignherokitComponent', () => {
  let component: AssignherokitComponent;
  let fixture: ComponentFixture<AssignherokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignherokitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignherokitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
