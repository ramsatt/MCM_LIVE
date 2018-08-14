import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesiteuserComponent } from './createsiteuser.component';

describe('CreatesiteuserComponent', () => {
  let component: CreatesiteuserComponent;
  let fixture: ComponentFixture<CreatesiteuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesiteuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesiteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
