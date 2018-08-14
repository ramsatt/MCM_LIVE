import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepartComponent } from './updatepart.component';

describe('UpdatepartComponent', () => {
  let component: UpdatepartComponent;
  let fixture: ComponentFixture<UpdatepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
