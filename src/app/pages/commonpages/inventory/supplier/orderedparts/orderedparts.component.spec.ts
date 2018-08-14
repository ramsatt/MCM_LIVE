import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedpartsComponent } from './orderedparts.component';

describe('OrderedpartsComponent', () => {
  let component: OrderedpartsComponent;
  let fixture: ComponentFixture<OrderedpartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedpartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
