import { TestBed, inject } from '@angular/core/testing';

import { SolutionService } from './solution.service';

describe('SolutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolutionService]
    });
  });

  it('should ...', inject([SolutionService], (service: SolutionService) => {
    expect(service).toBeTruthy();
  }));
});
