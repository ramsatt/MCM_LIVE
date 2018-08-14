import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchticketsComponent } from './branchtickets.component';

describe('BranchticketsComponent', () => {
  let component: BranchticketsComponent;
  let fixture: ComponentFixture<BranchticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
