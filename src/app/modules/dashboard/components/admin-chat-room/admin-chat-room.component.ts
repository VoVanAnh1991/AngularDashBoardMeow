import { Component, OnInit } from '@angular/core';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import  firebase from 'firebase';

@Component({
  selector: 'app-admin-chat-room',
  templateUrl: './admin-chat-room.component.html',
  styleUrls: ['./admin-chat-room.component.scss']
})
export class AdminChatRoomComponent implements OnInit {
  adminId: string;
  adminChatRoomMessages: Array<any>;
  newMessage: string;

  constructor(
    public adminTeamService: AdminTeamService,
    ) {
  }

  ngOnInit() {
    this.adminId = JSON.parse(localStorage.getItem('adminDashboard')).email;

    this.adminTeamService.getAdminChatRoom().subscribe(messages => {
      this.adminChatRoomMessages = messages.map(
        message => {
          return {
            ...(message.payload.doc.data() as {})
          }
        }
      )
    });
  }
  
  onSubmit() {
    let message: MessageForAdmin;
    message = {
      message: this.newMessage,
      adminId: this.adminId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    this.adminTeamService.sendMessageToAdmins(message);
    this.newMessage = null;
  }
}

export interface MessageForAdmin {
  timestamp: any;
  message: string;
  adminId: string;
}
