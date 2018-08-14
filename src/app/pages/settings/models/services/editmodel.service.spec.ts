import { TestBed, inject } from '@angular/core/testing';

import { EditmodelService } from './editmodel.service';

describe('EditmodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditmodelService]
    });
  });

  it('should ...', inject([EditmodelService], (service: EditmodelService) => {
    expect(service).toBeTruthy();
  }));
});
