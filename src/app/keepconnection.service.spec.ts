import { TestBed } from '@angular/core/testing';

import { KeepconnectionService } from './keepconnection.service';

describe('KeepconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepconnectionService = TestBed.get(KeepconnectionService);
    expect(service).toBeTruthy();
  });
});
