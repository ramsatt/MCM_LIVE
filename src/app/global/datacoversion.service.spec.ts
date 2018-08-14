import {TestBed, inject} from '@angular/core/testing';

import {DatacoversionService} from './datacoversion.service';

describe('DatacoversionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DatacoversionService]
        });
    });

    it('should ...', inject([DatacoversionService], (service: DatacoversionService) => {
        expect(service).toBeTruthy();
    }));
});
