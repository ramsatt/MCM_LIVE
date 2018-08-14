import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloverviewComponent } from './modeloverview.component';

describe('ModeloverviewComponent', () => {
  let component: ModeloverviewComponent;
  let fixture: ComponentFixture<ModeloverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
