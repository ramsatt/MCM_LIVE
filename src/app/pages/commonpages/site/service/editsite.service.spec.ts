import { TestBed, inject } from '@angular/core/testing';

import { EditsiteService } from './editsite.service';

describe('EditsiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditsiteService]
    });
  });

  it('should ...', inject([EditsiteService], (service: EditsiteService) => {
    expect(service).toBeTruthy();
  }));
});
