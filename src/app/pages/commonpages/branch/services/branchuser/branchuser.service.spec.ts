import { TestBed, inject } from '@angular/core/testing';

import { BranchuserService } from './branchuser.service';

describe('BranchuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchuserService]
    });
  });

  it('should ...', inject([BranchuserService], (service: BranchuserService) => {
    expect(service).toBeTruthy();
  }));
});
