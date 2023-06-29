import { TestBed } from '@angular/core/testing';

import { DlcService } from './dlc.service';

describe('DlcService', () => {
  let service: DlcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DlcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
