import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveassetsComponent } from './moveassets.component';

describe('MoveassetsComponent', () => {
  let component: MoveassetsComponent;
  let fixture: ComponentFixture<MoveassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
