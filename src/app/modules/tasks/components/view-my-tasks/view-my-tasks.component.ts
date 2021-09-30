import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UsersService } from 'src/app/services/users.service';
import firebase from 'firebase';
import { UserRoomsService } from 'src/app/services/user-rooms.service';

@Component({
  selector: 'app-view-my-tasks',
  templateUrl: './view-my-tasks.component.html',
  styleUrls: ['./view-my-tasks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ViewMyTasksComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }
  
  adminId: string;
  loading: boolean = true;
  gettingInfo: boolean = false;
  list : Array <any> = [];

  dataSource: any;
  message: string;
  displayedColumns: string[]=[
    "no", "assigned", "task", "from", "taskGiverId", "taskMessage", "date_created"
  ];
  expandedElement: any;
  
  taskAction: string;  
  taskMessage: string;
  taskGiverInfo: any;
  showInfo: boolean = false;
  showMessageInput: boolean = false;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor( 
    public adminTeamService: AdminTeamService,
    public usersService: UsersService,
    public userRoomsService: UserRoomsService,
    private _snackBar: MatSnackBar
    ) { 
      
  }
  
  ngOnInit(): void {
    this.adminId = JSON.parse(localStorage.getItem('adminDashboard')).email;
    let allTasks: any;
    this.adminTeamService.getOngoingTasks().subscribe(tasks => {
      allTasks = tasks.map((task, index) => {
        return {
          id: task.payload.doc.id,
          no: tasks.length - index,
          ...(task.payload.doc.data() as {})
        }
      })

      this.list = allTasks.filter((task: any) => task.to == this.adminId);
      this.dataSource = new MatTableDataSource<any>(this.list)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }) 
  }

  applyFilter(filterValue: any): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onGiveUpTask(id: string){
    this.giveUpTaskSnackBar('Giving up this Task?','Give Up',id)
  }
  
  giveUpTaskSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.adminTeamService.updateTask(actionInfo, {to: null})
    });
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

  onShowMessageInput(taskId: string, taskGiverId: string, from: string){
    this.gettingInfo = true;
    this.taskMessage=null; 
    this.showMessageInput = true;
    from == 'admin' && this.adminTeamService.getOneAdmin(taskGiverId).subscribe(result => {
      this.taskGiverInfo = result.data();
      this.gettingInfo = false;
    })
    from == 'user' && this.usersService.getOneUser(taskGiverId).subscribe(result => {
      this.taskGiverInfo = result.data();
      this.gettingInfo = false;
    })
    
  }

  sendMessageToAdmins(taskId: string, adminId: string, taskMessage: string, taskNo: string){
    let message: MessageForAdmin;
    message = {
      message: `Reply to Task No.${taskNo}: \n ${taskMessage}`,
      adminId: this.adminId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    this.adminTeamService.sendMessageToAdmins(message);
    this.adminTeamService.updateTask(taskId, {taskMessage});
  }

  sendMessageToUser(taskId: string, userId: string, taskMessage: string, task: string){
    let message: MessageForUser;
    // Send mess to user @Meow Real Chat
    message = {
      message: `Reply to " ${task} ": \n ${taskMessage}`,
      user: 'Admin Team',
      userId: 'AdminTeam',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    
    this.userRoomsService.sendMessageToUser(userId, message);
    this.adminTeamService.updateTask(taskId, {taskMessage});
  }

  sendToCompletedTasks(task: any){
    let { id, no, ...completedTask} = task;
    this.adminTeamService.sendToCompletedTasks(id, completedTask);
  }

}

export interface MessageForUser {
  timestamp: any;
  message: string;
  user: string;
  userId: string;
}

export interface MessageForAdmin {
  timestamp: any;
  message: string;
  adminId: string;
}
