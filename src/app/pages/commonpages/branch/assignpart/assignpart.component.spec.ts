import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignpartComponent } from './assignpart.component';

describe('AssignpartComponent', () => {
  let component: AssignpartComponent;
  let fixture: ComponentFixture<AssignpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
