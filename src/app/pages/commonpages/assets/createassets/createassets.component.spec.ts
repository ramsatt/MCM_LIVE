import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassetsComponent } from './createassets.component';

describe('CreateassetsComponent', () => {
  let component: CreateassetsComponent;
  let fixture: ComponentFixture<CreateassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
