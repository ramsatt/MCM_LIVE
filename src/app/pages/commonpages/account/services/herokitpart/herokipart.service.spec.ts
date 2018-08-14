import { TestBed, inject } from '@angular/core/testing';

import { HerokipartService } from './herokipart.service';

describe('HerokipartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HerokipartService]
    });
  });

  it('should ...', inject([HerokipartService], (service: HerokipartService) => {
    expect(service).toBeTruthy();
  }));
});
