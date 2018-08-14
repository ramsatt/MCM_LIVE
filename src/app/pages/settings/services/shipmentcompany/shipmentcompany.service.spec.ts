import { TestBed, inject } from '@angular/core/testing';

import { ShipmentcompanyService } from './shipmentcompany.service';

describe('ShipmentcompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipmentcompanyService]
    });
  });

  it('should ...', inject([ShipmentcompanyService], (service: ShipmentcompanyService) => {
    expect(service).toBeTruthy();
  }));
});
