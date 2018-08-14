import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemcmstaffComponent } from './createmcmstaff.component';

describe('CreatemcmstaffComponent', () => {
  let component: CreatemcmstaffComponent;
  let fixture: ComponentFixture<CreatemcmstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemcmstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemcmstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
