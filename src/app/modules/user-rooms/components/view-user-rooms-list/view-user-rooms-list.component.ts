import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-user-rooms-list',
  templateUrl: './view-user-rooms-list.component.html',
  styleUrls: ['./view-user-rooms-list.component.scss']
})

export class ViewUserRoomsListComponent implements OnInit {
  loading: boolean = true;
  lists : Array <any> = [];
  option: string;
  
  usernameList: any = {}
  dataSource;
  displayedColumns: string[]=[
    "no", "roomId", "roomType", "roomName", "noOfUsers", "***", "date_created", "action"
  ];

  deleting: boolean = false;
  deletingInfo: any;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor(
    public userRoomsService: UserRoomsService,
    public usersService: UsersService
    
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
            warning: roomMembers.includes(undefined)? 'warning' : '',
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
    confirm('Delete userRoom " ' + id + ' "') &&
    this.userRoomsService.delete(id);
  }

  onOption(userId: string, username: string, roomInfo: any) {
    userId && (this.deleting = true)
    && (this.deletingInfo = {userId,username,roomInfo});
  }

  onDeleteRoomMember(deletingInfo: any){
    let {roomInfo , userId, username } = deletingInfo;
    if (confirm(`Remove " ${username? username : 'Deleted User'} ( ${userId} ) " off \nRoom " ${roomInfo.id} " ?` )) {
      let index = roomInfo.roomUserIds.indexOf(userId);
      roomInfo.roomUserIds.splice(index,1)
      console.log(roomInfo.id)
      console.log(roomInfo.roomUserIds)
      this.userRoomsService.removeRoomMember(roomInfo.id,roomInfo.roomUserIds);
      this.deleting = false;
    }
    else this.deleting = false;
  }
}

