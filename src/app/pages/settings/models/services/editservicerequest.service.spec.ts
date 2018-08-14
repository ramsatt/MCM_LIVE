import { TestBed, inject } from '@angular/core/testing';

import { EditservicerequestService } from './editservicerequest.service';

describe('EditservicerequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditservicerequestService]
    });
  });

  it('should ...', inject([EditservicerequestService], (service: EditservicerequestService) => {
    expect(service).toBeTruthy();
  }));
});
