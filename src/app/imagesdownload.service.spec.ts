import { TestBed } from '@angular/core/testing';

import { ImagesdownloadService } from './imagesdownload.service';

describe('ImagesdownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesdownloadService = TestBed.get(ImagesdownloadService);
    expect(service).toBeTruthy();
  });
});
