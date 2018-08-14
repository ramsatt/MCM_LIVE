import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchticketdetailsComponent } from './branchticketdetails.component';

describe('BranchticketdetailsComponent', () => {
  let component: BranchticketdetailsComponent;
  let fixture: ComponentFixture<BranchticketdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchticketdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchticketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
