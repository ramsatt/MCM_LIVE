import { TestBed, inject } from '@angular/core/testing';

import { KnownissueService } from './knownissue.service';

describe('KnownissueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnownissueService]
    });
  });

  it('should ...', inject([KnownissueService], (service: KnownissueService) => {
    expect(service).toBeTruthy();
  }));
});
