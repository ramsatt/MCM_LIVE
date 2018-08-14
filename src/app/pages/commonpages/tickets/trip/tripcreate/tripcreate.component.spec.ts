import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripcreateComponent } from './tripcreate.component';

describe('TripcreateComponent', () => {
  let component: TripcreateComponent;
  let fixture: ComponentFixture<TripcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
