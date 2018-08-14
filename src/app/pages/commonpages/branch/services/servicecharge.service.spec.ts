import { TestBed, inject } from '@angular/core/testing';

import { ServicechargeService } from './servicecharge.service';

describe('ServicechargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicechargeService]
    });
  });

  it('should ...', inject([ServicechargeService], (service: ServicechargeService) => {
    expect(service).toBeTruthy();
  }));
});
