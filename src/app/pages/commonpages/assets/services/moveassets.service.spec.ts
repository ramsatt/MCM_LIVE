import { TestBed, inject } from '@angular/core/testing';

import { MoveassetsService } from './moveassets.service';

describe('MoveassetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveassetsService]
    });
  });

  it('should ...', inject([MoveassetsService], (service: MoveassetsService) => {
    expect(service).toBeTruthy();
  }));
});
