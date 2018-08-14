import { TestBed, inject } from '@angular/core/testing';

import { EditaccountService } from './editaccount.service';

describe('EditaccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaccountService]
    });
  });

  it('should ...', inject([EditaccountService], (service: EditaccountService) => {
    expect(service).toBeTruthy();
  }));
});
