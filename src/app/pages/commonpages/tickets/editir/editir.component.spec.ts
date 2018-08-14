import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditirComponent } from './editir.component';

describe('EditirComponent', () => {
  let component: EditirComponent;
  let fixture: ComponentFixture<EditirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
