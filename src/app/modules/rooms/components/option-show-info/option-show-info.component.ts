import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-option-show-info',
  templateUrl: './option-show-info.component.html',
  styleUrls: ['./option-show-info.component.scss']
})
export class OptionShowInfoComponent implements OnInit {
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
  roomNames: Array<string>;
  newName: string;
  noOfAnnouncements: number;


  constructor(
    private route: ActivatedRoute,
    public roomsService: RoomsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {
      this.loading = true;
      this.roomId= this.route.snapshot.paramMap.get('id') ;
      // !this.roomId && (this.roomId='9H1YOrizZi6EEzHmjkWR');
  }

  ngOnInit() {
    let roomDatas;
    this.roomsService.getRooms().subscribe(rooms => {
      roomDatas = rooms.map (room => {
        return {...(room.payload.doc.data() as {})}
      }) 
      this.roomNames = roomDatas.map(room => room.roomName);
    })

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
    (this.roomNames && this.roomInfo && this.roomMessages) && (this.loading = false);
  }
  
  onChangeRoomName(newName: string) {
    this.roomNames.includes(newName)?
      this.alertSnackBar("This room name isn't avaible.")
      : (this.roomsService.updateRoomNames(this.roomId, newName) 
          && this.alertSnackBar("Room name is changed.")
        )
      this.newName=null;

  }

  onDeleteRoom(){
    this.onDeleteRoomSnackBar('Delete this room?','Delete',this.roomId);
  }

  onDeleteRoomSnackBar(mess: string, action: string, actionInfo: any): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/rooms'])
      this.roomsService.deleteRoom(actionInfo);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      info.dismissedByAction? 
        this.alertSnackBar('Room is deleted.')
        : this.alertSnackBar('Cancel deleting room.')
    })
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 2000,
      ...this.snackBarStyle
    });
  }
}
