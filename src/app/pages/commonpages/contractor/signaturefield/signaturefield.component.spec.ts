import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturefieldComponent } from './signaturefield.component';

describe('SignaturefieldComponent', () => {
  let component: SignaturefieldComponent;
  let fixture: ComponentFixture<SignaturefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturefieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
