import { TestBed, inject } from '@angular/core/testing';

import { TsrmService } from './tsrm.service';

describe('TsrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TsrmService]
    });
  });

  it('should ...', inject([TsrmService], (service: TsrmService) => {
    expect(service).toBeTruthy();
  }));
});
