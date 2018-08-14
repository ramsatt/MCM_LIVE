import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapdetailsComponent } from './sitemapdetails.component';

describe('SitemapdetailsComponent', () => {
  let component: SitemapdetailsComponent;
  let fixture: ComponentFixture<SitemapdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
