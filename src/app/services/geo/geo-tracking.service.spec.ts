import { TestBed } from '@angular/core/testing';

import { GeoTrackingService } from './geo-tracking.service';

describe('GeoTrackingService', () => {
  let service: GeoTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
