import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';
@Component({
  selector: 'app-option-announcement-history',
  templateUrl: './option-announcement-history.component.html',
  styleUrls: ['./option-announcement-history.component.scss']
})
export class OptionAnnouncementHistoryComponent implements OnInit {
  loading: boolean = true;
  roomId: string;
  roomInfo: any;
  roomMessages: Array<any>;
  noOfAnnouncements: number;
  adminAnnouncements: Array<any>;

  constructor(
    public roomsService: RoomsService,
    private route: ActivatedRoute,
    ) {
      this.loading = true;
      this.roomId= this.route.snapshot.paramMap.get('id') ;
      // this.roomId= '9H1YOrizZi6EEzHmjkWR' ;
    }

  ngOnInit() {
    this.roomsService.getRoomInfo(this.roomId).subscribe(roomData => {
      this.roomInfo = roomData.payload.data();
    });

    this.roomsService.getRoomMessages(this.roomId).subscribe(messages => {
      this.roomMessages = messages.map(
        message => {
          return {
            id: message.payload.doc.id,
            ...(message.payload.doc.data() as {})
          }
        }
      )
      this.adminAnnouncements = this.roomMessages.filter( message => message.userId == 'AdminTeam')
      this.noOfAnnouncements = this.adminAnnouncements.length;
    });
  }

  ngAfterContentChecked() {
    (this.roomInfo && this.roomMessages) && (this.loading = false);
  }
  
}
