import { TestBed, inject } from '@angular/core/testing';

import { ContractorService } from './contractor.service';

describe('ContractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractorService]
    });
  });

  it('should ...', inject([ContractorService], (service: ContractorService) => {
    expect(service).toBeTruthy();
  }));
});
