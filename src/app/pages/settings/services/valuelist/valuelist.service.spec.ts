import { TestBed, inject } from '@angular/core/testing';

import { ValuelistService } from './valuelist.service';

describe('ValuelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValuelistService]
    });
  });

  it('should ...', inject([ValuelistService], (service: ValuelistService) => {
    expect(service).toBeTruthy();
  }));
});
