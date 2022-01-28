import { TestBed } from '@angular/core/testing';

import { MovieDetailService } from './movie-detail.service';

describe('MovieDetailService', () => {
  let service: MovieDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
