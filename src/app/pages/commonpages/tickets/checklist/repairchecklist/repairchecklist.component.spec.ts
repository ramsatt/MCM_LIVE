import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairchecklistComponent } from './repairchecklist.component';

describe('RepairchecklistComponent', () => {
  let component: RepairchecklistComponent;
  let fixture: ComponentFixture<RepairchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
