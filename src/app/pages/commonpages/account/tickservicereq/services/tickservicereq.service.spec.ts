import { TestBed, inject } from '@angular/core/testing';

import { TickservicereqService } from './tickservicereq.service';

describe('TickservicereqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TickservicereqService]
    });
  });

  it('should be created', inject([TickservicereqService], (service: TickservicereqService) => {
    expect(service).toBeTruthy();
  }));
});
