import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebranchComponent } from './createbranch.component';

describe('CreatebranchComponent', () => {
  let component: CreatebranchComponent;
  let fixture: ComponentFixture<CreatebranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
