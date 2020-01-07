import { TestBed } from '@angular/core/testing';

import { NgrxOperatorsService } from './ngrx-operators.service';

describe('NgrxOperatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgrxOperatorsService = TestBed.get(NgrxOperatorsService);
    expect(service).toBeTruthy();
  });
});
