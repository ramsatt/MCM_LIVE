import { TestBed, inject } from '@angular/core/testing';

import { GeninspdfService } from './geninspdf.service';

describe('GeninspdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeninspdfService]
    });
  });

  it('should ...', inject([GeninspdfService], (service: GeninspdfService) => {
    expect(service).toBeTruthy();
  }));
});
