import { TestBed, inject } from '@angular/core/testing';

import { EditTicketService } from './edit-ticket.service';

describe('EditTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditTicketService]
    });
  });

  it('should ...', inject([EditTicketService], (service: EditTicketService) => {
    expect(service).toBeTruthy();
  }));
});
