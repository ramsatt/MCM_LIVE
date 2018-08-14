import { TestBed, inject } from '@angular/core/testing';

import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetsService]
    });
  });

  it('should ...', inject([AssetsService], (service: AssetsService) => {
    expect(service).toBeTruthy();
  }));
});
