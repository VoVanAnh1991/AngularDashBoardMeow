import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUsersListComponent } from './mini-users-list.component';

describe('MiniUsersListComponent', () => {
  let component: MiniUsersListComponent;
  let fixture: ComponentFixture<MiniUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
