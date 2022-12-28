import { TestBed } from '@angular/core/testing';

import { SingerService } from './singer.service';

describe('SingerService', () => {
  let service: SingerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
