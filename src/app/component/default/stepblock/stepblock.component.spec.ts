import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepblockComponent } from './stepblock.component';

describe('StepblockComponent', () => {
  let component: StepblockComponent;
  let fixture: ComponentFixture<StepblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
