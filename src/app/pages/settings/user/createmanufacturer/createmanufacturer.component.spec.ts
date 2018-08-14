import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemanufacturerComponent } from './createmanufacturer.component';

describe('CreatemanufacturerComponent', () => {
  let component: CreatemanufacturerComponent;
  let fixture: ComponentFixture<CreatemanufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemanufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemanufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
