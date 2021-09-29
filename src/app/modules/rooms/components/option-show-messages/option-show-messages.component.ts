import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-option-show-messages',
  templateUrl: './option-show-messages.component.html',
  styleUrls: ['./option-show-messages.component.scss']
})
export class OptionShowMessagesComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }

  loading: boolean = true;
  roomId: string;
  roomInfo: any;
  roomMessages: Array<any>;
  noOfAnnouncements: number;
  newAnnouncement: string;

  constructor(
    public roomsService: RoomsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
    ) {
      this.loading = true;
      this.roomId= this.route.snapshot.paramMap.get('id') ;
      // this.roomId='Q8fyWwY1as5sck4gCw5i'
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
      let dummyArray = this.roomMessages.filter( message => message.userId == 'AdminTeam')
      this.noOfAnnouncements = dummyArray.length;
    });
  }

  ngAfterContentChecked() {
    (this.roomInfo && this.roomMessages) && (this.loading = false);
  }
  
  onSubmit() {
    this.roomsService.sendAnnouncement(this.roomId, this.newAnnouncement).then(() => {
      this.newAnnouncement=null;
    })
  }

  onDeleteAllMessages(){
    this.onDeleteAllMessagesSnackBar('Delete all messages?','Delete',this.roomId)
  }

  onDeleteAllMessagesSnackBar(mess: string, action: string, actionInfo: any): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.roomsService.onDeleteAllMessages(this.roomId);
      this.roomsService.isUpdated(this.roomId);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      info.dismissedByAction? 
        this.alertSnackBar('All messages is deleted.')
        : this.alertSnackBar('Cancel deleting all messages.')
    })
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 3000,
      ...this.snackBarStyle
    });
  }
}
