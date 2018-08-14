import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuelistComponent } from './valuelist.component';

describe('ValuelistComponent', () => {
  let component: ValuelistComponent;
  let fixture: ComponentFixture<ValuelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
