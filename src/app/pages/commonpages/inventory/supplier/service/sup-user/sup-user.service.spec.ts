import { TestBed, inject } from '@angular/core/testing';

import { SupUserService } from './sup-user.service';

describe('SupUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupUserService]
    });
  });

  it('should ...', inject([SupUserService], (service: SupUserService) => {
    expect(service).toBeTruthy();
  }));
});
