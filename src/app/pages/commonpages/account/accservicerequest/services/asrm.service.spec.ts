import { TestBed, inject } from '@angular/core/testing';

import { AsrmService } from './asrm.service';

describe('AsrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsrmService]
    });
  });

  it('should ...', inject([AsrmService], (service: AsrmService) => {
    expect(service).toBeTruthy();
  }));
});
