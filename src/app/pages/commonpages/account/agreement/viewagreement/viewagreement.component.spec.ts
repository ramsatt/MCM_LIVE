import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewagreementComponent } from './viewagreement.component';

describe('ViewagreementComponent', () => {
  let component: ViewagreementComponent;
  let fixture: ComponentFixture<ViewagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
