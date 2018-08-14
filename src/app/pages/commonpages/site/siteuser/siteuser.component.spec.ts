import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteuserComponent } from './siteuser.component';

describe('SiteuserComponent', () => {
  let component: SiteuserComponent;
  let fixture: ComponentFixture<SiteuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
