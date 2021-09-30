import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-dashboard-list',
  templateUrl: './view-dashboard-list.component.html',
  styleUrls: ['./view-dashboard-list.component.scss']
})
export class ViewDashboardListComponent implements OnInit {  
  loading: boolean = true;
  totalTasks: number = 0;
  totalUsers: number = 0;
  totalWeekUsers: number = 0;
  totalMonthUsers: number = 0;
  rooms: number=0;
  userFriends: number=0;
  userRooms: number=0;
  userKeepbox: number=0;


  constructor( 
    public usersService: UsersService,
    public userRoomsService: UserRoomsService,
    public roomsService: RoomsService,
    public adminTeamService: AdminTeamService,
    private db: AngularFirestore,
  ) {
  }
 
  ngOnInit(): void {
    this.loading = true;
    this.usersService.getAllUsers().subscribe((result)=>{
      this.totalUsers = result.length;
      result.filter((item:any) =>{
        new Date().getUTCMonth() + 1 === item.payload.doc.data().timestamp.toDate().getUTCMonth()+1 &&
        (this.totalMonthUsers += 1);
      })
    })

    this.adminTeamService.getOngoingTasks().subscribe((result)=>{
      this.totalTasks = result.length; 
    })

    this.roomsService.getRooms().subscribe(rooms => this.rooms = rooms.length)
    this.userRoomsService.getQueryEqual('roomType','userFriends').subscribe(rooms => this.userFriends= rooms.length);
    this.userRoomsService.getQueryEqual('roomType','userRooms').subscribe(rooms => this.userRooms = rooms.length);
    this.userRoomsService.getQueryEqual('roomType','userKeepbox').subscribe(rooms => this.userKeepbox = rooms.length);
    
  }

  ngAfterContentChecked(){
    if (this.totalTasks && this.totalUsers && this.totalTasks) 
    {
      this.loading = false;
    }
  }
}
