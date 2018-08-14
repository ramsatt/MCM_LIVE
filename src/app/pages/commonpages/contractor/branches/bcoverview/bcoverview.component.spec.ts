import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcoverviewComponent } from './bcoverview.component';

describe('BcoverviewComponent', () => {
  let component: BcoverviewComponent;
  let fixture: ComponentFixture<BcoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
