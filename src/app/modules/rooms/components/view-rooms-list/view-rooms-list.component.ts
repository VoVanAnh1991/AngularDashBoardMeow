import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-view-rooms-list',
  templateUrl: './view-rooms-list.component.html',
  styleUrls: ['./view-rooms-list.component.scss']
})
export class ViewRoomsListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }
  selectedRoom: string;
  selectedAction: string;
  loading: boolean = true;
  adding: boolean = false;
  roomList: Array <any> = [
  ];
  roomOptions: Array <any> = [];
  allRoomNames: Array <any> = [];
  actionOptions = ["Show Info",'Show Messages','Announcement History'];
  addRoomOption = { roomName: 'Add new room', index: -1 };
  messageList: Array <any> = [];
  
  newRoomName: string;
  currentId="Public1";

  constructor( 
    public roomsService: RoomsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    ) { 
    }
    
  ngOnInit(): void {
    this.roomsService.getRooms().subscribe(result => {
      this.roomList = result.map( (room, index) => {
        return {
          ...(room.payload.doc.data() as {}),
          id: room.payload.doc.id,
          index,
        }
      })
      this.roomOptions = [this.addRoomOption, ...this.roomList]
      this.allRoomNames = this.roomList.map( room => room.roomName);
      this.loading = false;
    })
  }

  moveback() {
    this.router.navigate(['rooms/'])
  }

  onAddRoom(){
    this.adding = true;
  }
 
  addRoom(newRoomName: string){
    this.roomsService.addRoom(newRoomName);
    this.alertSnackBar('New room is created.')
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 2000,
      ...this.snackBarStyle
    });
  }
}
