import { TestBed, inject } from '@angular/core/testing';

import { HerokitService } from './herokit.service';

describe('HerokitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HerokitService]
    });
  });

  it('should ...', inject([HerokitService], (service: HerokitService) => {
    expect(service).toBeTruthy();
  }));
});
