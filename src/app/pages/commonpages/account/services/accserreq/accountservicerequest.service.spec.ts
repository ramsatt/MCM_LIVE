import { TestBed, inject } from '@angular/core/testing';

import { AccountservicerequestService } from './accountservicerequest.service';

describe('AccountservicerequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountservicerequestService]
    });
  });

  it('should ...', inject([AccountservicerequestService], (service: AccountservicerequestService) => {
    expect(service).toBeTruthy();
  }));
});
