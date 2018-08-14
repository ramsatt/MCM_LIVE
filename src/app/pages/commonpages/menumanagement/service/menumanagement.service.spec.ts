import { TestBed, inject } from '@angular/core/testing';

import { MenumanagementService } from './menumanagement.service';

describe('MenumanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenumanagementService]
    });
  });

  it('should ...', inject([MenumanagementService], (service: MenumanagementService) => {
    expect(service).toBeTruthy();
  }));
});
