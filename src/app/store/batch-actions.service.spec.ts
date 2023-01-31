import { TestBed } from '@angular/core/testing';

import { BatchActionsService } from './batch-actions.service';

describe('BatchActionsService', () => {
  let service: BatchActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
