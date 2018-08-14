import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistcategoryComponent } from './checklistcategory.component';

describe('ChecklistcategoryComponent', () => {
  let component: ChecklistcategoryComponent;
  let fixture: ComponentFixture<ChecklistcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
