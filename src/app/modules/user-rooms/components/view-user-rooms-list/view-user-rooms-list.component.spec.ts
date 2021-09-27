import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserRoomsListComponent } from './view-user-rooms-list.component';

describe('ViewUserRoomsListComponent', () => {
  let component: ViewUserRoomsListComponent;
  let fixture: ComponentFixture<ViewUserRoomsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserRoomsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
