import { TestBed, inject } from '@angular/core/testing';

import { IncidentreportService } from './incidentreport.service';

describe('IncidentreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentreportService]
    });
  });

  it('should ...', inject([IncidentreportService], (service: IncidentreportService) => {
    expect(service).toBeTruthy();
  }));
});
