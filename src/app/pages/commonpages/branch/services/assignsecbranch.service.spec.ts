import { TestBed, inject } from '@angular/core/testing';

import { AssignsecbranchService } from './assignsecbranch.service';

describe('AssignsecbranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignsecbranchService]
    });
  });

  it('should ...', inject([AssignsecbranchService], (service: AssignsecbranchService) => {
    expect(service).toBeTruthy();
  }));
});
