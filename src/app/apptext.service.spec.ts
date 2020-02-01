import { TestBed } from '@angular/core/testing';

import { ApptextService } from './apptext.service';

describe('ApptextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApptextService = TestBed.get(ApptextService);
    expect(service).toBeTruthy();
  });
});
