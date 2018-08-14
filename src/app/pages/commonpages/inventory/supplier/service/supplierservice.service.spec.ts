import { TestBed, inject } from '@angular/core/testing';

import { SupplierserviceService } from './supplierservice.service';

describe('SupplierserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierserviceService]
    });
  });

  it('should ...', inject([SupplierserviceService], (service: SupplierserviceService) => {
    expect(service).toBeTruthy();
  }));
});
