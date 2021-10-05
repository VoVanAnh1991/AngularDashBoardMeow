import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';
import * as XLSX from 'xlsx';

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
  list : Array <any> = [];
  option: string;
  
  usernameList: any = {}
  dataSource: any;
  displayedColumns: string[]=[
    "no", "roomId", "roomType", "roomName", "noOfUsers", "***", "date_created", "action"
  ];

  deleting: boolean = false;
  deletingId: string;
  deletingInfo: any;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  @ViewChild('TABLE', {static: true}) table: ElementRef;

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
        duration: 2000,
        ...this.snackBarStyle
      });
    }
    
    ngOnInit(): void {  
      this.userRoomsService.getAllUserRooms().subscribe((result)=>{
        this.list = result.map((item, index)=>{         
          return {
            no: result.length - index , 
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as {}),
          }
        })
        let allUsernames = this.usernameList.map(user => {return user.username});
        let allUserIds = this.usernameList.map(user => {return user.id});
        this.list.forEach((room, index) => {
          let roomMembers = room.roomUserIds.map(id => {
            let index = allUserIds.indexOf(id)
            return allUsernames[index];
          })
          this.list[index] = {
            ...this.list[index],
            roomMembers,
            warning: roomMembers.includes(undefined)? 'warning' :  
                  (this.list[index].roomType == 'userFriends' 
                    && roomMembers.length <2) ? 'warning' : ''
          };
        })
        

        this.dataSource = new MatTableDataSource<any>(this.list)
        this.dataSource.paginator = this.paginator;
        this.loading = false;
    })
  }
  
  applyFilter(filterValue: string): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.deleting = false;
  }

  exportAsExcel()
  {
    let excelList = this.list.map(room =>  { 
      let dummy = room;
      delete dummy.roomStr;
      delete dummy.warning;
      return {
        ...dummy,
        lastChanged: room.lastChanged.toDate().toLocaleString(),
        timestamp: room.timestamp.toDate().toLocaleString(),
        roomMembers: room.roomMembers.toString(),
        roomUserIds: room.roomUserIds.toString(),
      }
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "User's Rooms List");
    XLSX.writeFile(wb, "User's Rooms List.xlsx");
  }

  exportFilterAsExcel()
  {
    const wsF: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wbF: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wbF, wsF, "User's Rooms List (Filtered)");
    XLSX.writeFile(wbF, "User's Rooms List (Filtered).xlsx");
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

