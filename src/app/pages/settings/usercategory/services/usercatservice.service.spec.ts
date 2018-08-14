import { TestBed, inject } from '@angular/core/testing';

import { UsercatserviceService } from './usercatservice.service';

describe('UsercatserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercatserviceService]
    });
  });

  it('should ...', inject([UsercatserviceService], (service: UsercatserviceService) => {
    expect(service).toBeTruthy();
  }));
});
