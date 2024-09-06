import { TestBed } from '@angular/core/testing';

import { InterFacesService } from './inter-faces.service';

describe('InterFacesService', () => {
  let service: InterFacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterFacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
