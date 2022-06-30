import { TestBed } from '@angular/core/testing';

import { MusicGroupServiceService } from './music-group-service.service';

describe('MusicGroupsServiceService', () => {
  let service: MusicGroupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGroupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
