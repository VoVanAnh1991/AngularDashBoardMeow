import { TestBed } from '@angular/core/testing';

import { AdminTeamService } from './admin-team.service';

describe('AdminTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminTeamService = TestBed.get(AdminTeamService);
    expect(service).toBeTruthy();
  });
});
