import { TestBed, inject } from '@angular/core/testing';

import { AssignbranchService } from './assignbranch.service';

describe('AssignbranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignbranchService]
    });
  });

  it('should ...', inject([AssignbranchService], (service: AssignbranchService) => {
    expect(service).toBeTruthy();
  }));
});
