import { TestBed, inject } from '@angular/core/testing';

import { TicketstatusService } from './ticketstatus.service';

describe('TicketstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketstatusService]
    });
  });

  it('should ...', inject([TicketstatusService], (service: TicketstatusService) => {
    expect(service).toBeTruthy();
  }));
});
