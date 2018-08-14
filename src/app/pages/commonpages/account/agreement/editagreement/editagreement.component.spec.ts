import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditagreementComponent } from './editagreement.component';

describe('EditagreementComponent', () => {
  let component: EditagreementComponent;
  let fixture: ComponentFixture<EditagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
