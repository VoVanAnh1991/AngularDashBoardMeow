import { TestBed } from '@angular/core/testing';

import { UserRoomsService } from './user-rooms.service';

describe('UserRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRoomsService = TestBed.get(UserRoomsService);
    expect(service).toBeTruthy();
  });
});
