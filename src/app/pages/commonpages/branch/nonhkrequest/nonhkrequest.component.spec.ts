import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonhkrequestComponent } from './nonhkrequest.component';

describe('NonhkrequestComponent', () => {
  let component: NonhkrequestComponent;
  let fixture: ComponentFixture<NonhkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonhkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonhkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
