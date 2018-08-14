import { TestBed, inject } from '@angular/core/testing';

import { EmailcontentService } from './emailcontent.service';

describe('EmailcontentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailcontentService]
    });
  });

  it('should ...', inject([EmailcontentService], (service: EmailcontentService) => {
    expect(service).toBeTruthy();
  }));
});
