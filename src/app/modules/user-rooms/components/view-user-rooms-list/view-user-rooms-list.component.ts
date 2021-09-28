import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user-rooms-list',
  templateUrl: './view-user-rooms-list.component.html',
  styleUrls: ['./view-user-rooms-list.component.scss']
})

export class ViewUserRoomsListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }

  loading: boolean = true;
  lists : Array <any> = [];
  option: string;
  
  usernameList: any = {}
  dataSource;
  displayedColumns: string[]=[
    "no", "roomId", "roomType", "roomName", "noOfUsers", "***", "date_created", "action"
  ];

  deleting: boolean = false;
  deletingId: string;
  deletingInfo: any;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor(
    public userRoomsService: UserRoomsService,
    public usersService: UsersService,
    private _snackBar: MatSnackBar
    
    ) { 
      this.usersService.getAllUsers().subscribe((result)=>{
        this.usernameList = result.map((item)=>{
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as {})
          }
        })
        this.loading = false;
      })
    }
    
    alertSnackBar(mess: string): void {   
      this._snackBar.open(mess, null, {
        duration: 3000,
        ...this.snackBarStyle
      });
    }

    ngOnInit(): void {  
      this.userRoomsService.getAllUserRooms().subscribe((result)=>{
        this.lists = result.map((item, index)=>{         
          return {
            no: result.length - index , 
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as {}),
          }
        })
        let allUsernames = this.usernameList.map(user => {return user.username});
        let allUserIds = this.usernameList.map(user => {return user.id});
        this.lists.forEach((room, index) => {
          let roomMembers = room.roomUserIds.map(id => {
            let index = allUserIds.indexOf(id)
            return allUsernames[index];
          })
          this.lists[index] = {
            ...this.lists[index],
            roomMembers,
            warning: roomMembers.includes(undefined)? 'warning' :  
                  (this.lists[index].roomType == 'userFriends' 
                    && roomMembers.length <2) ? 'warning' : ''
          };
        })
        

        this.dataSource = new MatTableDataSource<any>(this.lists)
        this.dataSource.paginator = this.paginator;
        this.loading = false;
    })
  }

  applyFilter(filterValue: string): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.deleting = false;
  }

  onDeleteUserRoom(id: string){
    this.deletingInfo = null;
    this.deleting = true;
    this.deletingId = id;
    this.deleteUserRoomSnackBar(`Delete room " ${id} "`, 'Delete',id) 
  }
  
  deleteUserRoomSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 5000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.userRoomsService.delete(actionInfo);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      this.deletingId = null;
      info.dismissedByAction? 
        this.alertSnackBar('Room is deleted.')
        : this.alertSnackBar('Cancel deleting room.')
    })
  }

  onOption(userId: string, username: string, roomInfo: any) {
    userId && (this.deleting = true)
    && (this.deletingInfo = {userId,username,roomInfo});
  }

  onDeleteRoomMember(deletingInfo: any){
    let {roomInfo , userId, username } = deletingInfo;
    this.deleteRoomMemberSnackBar(
      `Remove " ${username? username : 'Deleted User'} " (${userId}) out of room   " ${roomInfo.id} " ?`,
      'Delete',
      deletingInfo
    )
  }
  
  deleteRoomMemberSnackBar(mess: string, action: string, actionInfo: any): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 5000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      let {roomInfo , userId } = actionInfo;
      let index = roomInfo.roomUserIds.indexOf(userId);
      roomInfo.roomUserIds.splice(index,1)
      this.userRoomsService.removeRoomMember(roomInfo.id,roomInfo.roomUserIds);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      this.deletingInfo = null;
      info.dismissedByAction? 
        this.alertSnackBar('User is removed out of room.')
        : this.alertSnackBar('Cancel removing user out of room.')
    })
  }
}

