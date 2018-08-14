import { TestBed, inject } from '@angular/core/testing';

import { EditsolutionService } from './editsolution.service';

describe('EditsolutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditsolutionService]
    });
  });

  it('should ...', inject([EditsolutionService], (service: EditsolutionService) => {
    expect(service).toBeTruthy();
  }));
});
