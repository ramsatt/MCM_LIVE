import { TestBed, inject } from '@angular/core/testing';

import { InstructionpdfService } from './instructionpdf.service';

describe('InstructionpdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstructionpdfService]
    });
  });

  it('should ...', inject([InstructionpdfService], (service: InstructionpdfService) => {
    expect(service).toBeTruthy();
  }));
});
