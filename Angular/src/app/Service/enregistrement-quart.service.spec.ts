import { TestBed } from '@angular/core/testing';

import { EnregistrementQuartService } from './enregistrement-quart.service';

describe('EnregistrementQuartService', () => {
  let service: EnregistrementQuartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnregistrementQuartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
