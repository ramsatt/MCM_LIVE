import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercategoryComponent } from './usercategory.component';

describe('UsercategoryComponent', () => {
  let component: UsercategoryComponent;
  let fixture: ComponentFixture<UsercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
