import { TestBed, inject } from '@angular/core/testing';

import { EditsupplierService } from './editsupplier.service';

describe('EditsupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditsupplierService]
    });
  });

  it('should ...', inject([EditsupplierService], (service: EditsupplierService) => {
    expect(service).toBeTruthy();
  }));
});
