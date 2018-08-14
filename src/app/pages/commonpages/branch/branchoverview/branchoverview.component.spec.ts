import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchoverviewComponent } from './branchoverview.component';

describe('BranchoverviewComponent', () => {
  let component: BranchoverviewComponent;
  let fixture: ComponentFixture<BranchoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
