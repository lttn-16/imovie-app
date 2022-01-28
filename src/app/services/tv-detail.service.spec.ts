import { TestBed } from '@angular/core/testing';

import { TvDetailService } from './tv-detail.service';

describe('TvDetailService', () => {
  let service: TvDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
