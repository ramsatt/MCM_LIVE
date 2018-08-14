import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HkrequestComponent } from './hkrequest.component';

describe('HkrequestComponent', () => {
  let component: HkrequestComponent;
  let fixture: ComponentFixture<HkrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HkrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
