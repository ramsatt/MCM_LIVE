import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecustomersComponent } from './createcustomers.component';

describe('CreatecustomersComponent', () => {
  let component: CreatecustomersComponent;
  let fixture: ComponentFixture<CreatecustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
