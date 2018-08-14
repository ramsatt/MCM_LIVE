import { TestBed, inject } from '@angular/core/testing';

import { PartsService } from './parts.service';

describe('PartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartsService]
    });
  });

  it('should ...', inject([PartsService], (service: PartsService) => {
    expect(service).toBeTruthy();
  }));
});
