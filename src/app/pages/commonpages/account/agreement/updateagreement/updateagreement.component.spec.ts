import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateagreementComponent } from './updateagreement.component';

describe('UpdateagreementComponent', () => {
  let component: UpdateagreementComponent;
  let fixture: ComponentFixture<UpdateagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
