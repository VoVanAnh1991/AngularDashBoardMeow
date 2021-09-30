import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatRoomComponent } from './admin-chat-room.component';

describe('AdminChatRoomComponent', () => {
  let component: AdminChatRoomComponent;
  let fixture: ComponentFixture<AdminChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
