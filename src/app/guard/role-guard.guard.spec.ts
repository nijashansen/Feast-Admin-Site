import {TestBed} from '@angular/core/testing';

import {RoleGuard} from './role-guard';

describe('RoleGuardGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
