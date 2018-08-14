import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstuctionlistComponent } from './instuctionlist.component';

describe('InstuctionlistComponent', () => {
  let component: InstuctionlistComponent;
  let fixture: ComponentFixture<InstuctionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstuctionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstuctionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
