import { TestBed, inject } from '@angular/core/testing';

import { SiteuserService } from './siteuser.service';

describe('SiteuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteuserService]
    });
  });

  it('should ...', inject([SiteuserService], (service: SiteuserService) => {
    expect(service).toBeTruthy();
  }));
});
