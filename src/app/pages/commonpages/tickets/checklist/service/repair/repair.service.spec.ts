import { TestBed, inject } from '@angular/core/testing';

import { RepairService } from './repair.service';

describe('RepairService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairService]
    });
  });

  it('should ...', inject([RepairService], (service: RepairService) => {
    expect(service).toBeTruthy();
  }));
});
