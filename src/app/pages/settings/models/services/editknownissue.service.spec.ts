import { TestBed, inject } from '@angular/core/testing';

import { EditknownissueService } from './editknownissue.service';

describe('EditknownissueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditknownissueService]
    });
  });

  it('should ...', inject([EditknownissueService], (service: EditknownissueService) => {
    expect(service).toBeTruthy();
  }));
});
