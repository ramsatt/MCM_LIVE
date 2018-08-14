import { TestBed, inject } from '@angular/core/testing';

import { TicketcontactService } from './ticketcontact.service';

describe('TicketcontactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketcontactService]
    });
  });

  it('should ...', inject([TicketcontactService], (service: TicketcontactService) => {
    expect(service).toBeTruthy();
  }));
});
