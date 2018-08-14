import { TestBed, inject } from '@angular/core/testing';

import { SrmService } from './srm.service';

describe('SrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrmService]
    });
  });

  it('should ...', inject([SrmService], (service: SrmService) => {
    expect(service).toBeTruthy();
  }));
});
