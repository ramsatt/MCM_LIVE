import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcaddComponent } from './bcadd.component';

describe('BcaddComponent', () => {
  let component: BcaddComponent;
  let fixture: ComponentFixture<BcaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
