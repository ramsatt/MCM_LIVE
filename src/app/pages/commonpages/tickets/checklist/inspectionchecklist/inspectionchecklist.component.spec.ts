import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionchecklistComponent } from './inspectionchecklist.component';

describe('InspectionchecklistComponent', () => {
  let component: InspectionchecklistComponent;
  let fixture: ComponentFixture<InspectionchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
