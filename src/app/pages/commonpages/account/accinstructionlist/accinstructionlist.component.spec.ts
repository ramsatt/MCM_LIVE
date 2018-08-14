import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccinstructionlistComponent } from './accinstructionlist.component';

describe('AccinstructionlistComponent', () => {
  let component: AccinstructionlistComponent;
  let fixture: ComponentFixture<AccinstructionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccinstructionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccinstructionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
