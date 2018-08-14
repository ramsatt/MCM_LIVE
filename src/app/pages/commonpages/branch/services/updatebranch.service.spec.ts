import { TestBed, inject } from '@angular/core/testing';

import { UpdatebranchService } from './updatebranch.service';

describe('UpdatebranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatebranchService]
    });
  });

  it('should ...', inject([UpdatebranchService], (service: UpdatebranchService) => {
    expect(service).toBeTruthy();
  }));
});
