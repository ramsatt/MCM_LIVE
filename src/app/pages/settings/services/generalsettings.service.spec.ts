import { TestBed, inject } from '@angular/core/testing';

import { GeneralsettingsService } from './generalsettings.service';

describe('GeneralsettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralsettingsService]
    });
  });

  it('should ...', inject([GeneralsettingsService], (service: GeneralsettingsService) => {
    expect(service).toBeTruthy();
  }));
});
