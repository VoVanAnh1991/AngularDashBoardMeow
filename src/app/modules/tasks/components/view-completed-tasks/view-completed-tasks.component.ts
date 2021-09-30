import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UsersService } from 'src/app/services/users.service';
import firebase from 'firebase';
import { UserRoomsService } from 'src/app/services/user-rooms.service';

@Component({
  selector: 'app-view-completed-tasks',
  templateUrl: './view-completed-tasks.component.html',
  styleUrls: ['./view-completed-tasks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewCompletedTasksComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }
  
  list : Array <any> = [];
  adminId: string;
  loading: boolean = true;
  gettingInfo: boolean = false;
  showInfo: boolean = false;
  
  dataSource: any;
  message: string;
  taskGiverInfo: any;
  displayedColumns: string[]=[
    "no", "task", "from", "taskGiverId", "to", "taskMessage", "date_completed"
  ];
  expandedElement: any;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor( 
    public adminTeamService: AdminTeamService,
    public usersService: UsersService,
    public userRoomsService: UserRoomsService,
    private _snackBar: MatSnackBar
    ) { 
      
  }

  getUserInfo(id: string){
    this.gettingInfo = true;
    this.showInfo = true;
    this.usersService.getOneUser(id).subscribe(result => {
      this.taskGiverInfo = result.data();
      this.gettingInfo = false
    })
  }

  getAdminInfo(id: string){
    this.gettingInfo = true;
    this.showInfo = true;
    this.adminTeamService.getOneAdmin(id).subscribe(result => {
      this.taskGiverInfo = result.data();
      this.gettingInfo = false;
    }) 
  }
  
  ngOnInit(): void {
    this.adminId = JSON.parse(localStorage.getItem('adminDashboard')).email;
    this.adminTeamService.getCompletedTasks().subscribe(tasks => {
      this.list = tasks.map((task, index) => {
        return {
          id: task.payload.doc.id,
          no: tasks.length - index,
          ...(task.payload.doc.data() as {})
        }
      })

      this.dataSource = new MatTableDataSource<any>(this.list)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }) 
  }

  applyFilter(filterValue: any): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}