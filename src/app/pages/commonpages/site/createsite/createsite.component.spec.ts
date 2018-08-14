import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesiteComponent } from './createsite.component';

describe('CreatesiteComponent', () => {
  let component: CreatesiteComponent;
  let fixture: ComponentFixture<CreatesiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
