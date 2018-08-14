import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchuserComponent } from './branchuser.component';

describe('BranchuserComponent', () => {
  let component: BranchuserComponent;
  let fixture: ComponentFixture<BranchuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
