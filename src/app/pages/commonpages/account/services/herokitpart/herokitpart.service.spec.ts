import { TestBed, inject } from '@angular/core/testing';

import { HerokitpartService } from './herokitpart.service';

describe('HerokitpartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HerokitpartService]
    });
  });

  it('should ...', inject([HerokitpartService], (service: HerokitpartService) => {
    expect(service).toBeTruthy();
  }));
});
