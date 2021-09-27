import { TestBed } from '@angular/core/testing';

import { AddminTeamService } from './addmin-team.service';

describe('AddminTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddminTeamService = TestBed.get(AddminTeamService);
    expect(service).toBeTruthy();
  });
});
