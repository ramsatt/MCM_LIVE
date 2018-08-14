import { TestBed, inject } from '@angular/core/testing';

import { CountService } from './count.service';

describe('CountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountService]
    });
  });

  it('should ...', inject([CountService], (service: CountService) => {
    expect(service).toBeTruthy();
  }));
});
