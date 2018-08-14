import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedpartsComponent } from './requestedparts.component';

describe('RequestedpartsComponent', () => {
  let component: RequestedpartsComponent;
  let fixture: ComponentFixture<RequestedpartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedpartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
