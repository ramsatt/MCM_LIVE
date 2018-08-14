import { TestBed, inject } from '@angular/core/testing';

import { InstructionlistService } from './instructionlist.service';

describe('InstructionlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructionlistService]
    });
  });

  it('should ...', inject([InstructionlistService], (service: InstructionlistService) => {
    expect(service).toBeTruthy();
  }));
});
