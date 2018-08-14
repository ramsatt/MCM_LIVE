import { TestBed, inject } from '@angular/core/testing';

import { AccuserService } from './accuser.service';

describe('AccuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccuserService]
    });
  });

  it('should ...', inject([AccuserService], (service: AccuserService) => {
    expect(service).toBeTruthy();
  }));
});
