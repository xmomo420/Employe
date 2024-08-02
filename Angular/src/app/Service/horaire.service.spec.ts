import { TestBed } from '@angular/core/testing';

import { HoraireService } from './horaire.service';

describe('HoraireService', () => {
  let service: HoraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
