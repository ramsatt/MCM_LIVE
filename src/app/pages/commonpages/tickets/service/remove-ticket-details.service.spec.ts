import { TestBed, inject } from '@angular/core/testing';

import { RemoveTicketDetailsService } from './remove-ticket-details.service';

describe('RemoveTicketDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveTicketDetailsService]
    });
  });

  it('should ...', inject([RemoveTicketDetailsService], (service: RemoveTicketDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
