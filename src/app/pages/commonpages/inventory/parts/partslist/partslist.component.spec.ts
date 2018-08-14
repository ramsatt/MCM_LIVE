import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartslistComponent } from './partslist.component';

describe('PartslistComponent', () => {
  let component: PartslistComponent;
  let fixture: ComponentFixture<PartslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
