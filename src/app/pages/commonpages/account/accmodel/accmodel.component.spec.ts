import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccmodelComponent } from './accmodel.component';

describe('AccmodelComponent', () => {
  let component: AccmodelComponent;
  let fixture: ComponentFixture<AccmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
