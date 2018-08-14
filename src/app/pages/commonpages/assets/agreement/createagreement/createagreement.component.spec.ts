import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateagreementComponent } from './createagreement.component';

describe('CreateagreementComponent', () => {
  let component: CreateagreementComponent;
  let fixture: ComponentFixture<CreateagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
