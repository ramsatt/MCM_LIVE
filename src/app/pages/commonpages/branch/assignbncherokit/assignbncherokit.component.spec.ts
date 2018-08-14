import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignbncherokitComponent } from './assignbncherokit.component';

describe('AssignbncherokitComponent', () => {
  let component: AssignbncherokitComponent;
  let fixture: ComponentFixture<AssignbncherokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignbncherokitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignbncherokitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
