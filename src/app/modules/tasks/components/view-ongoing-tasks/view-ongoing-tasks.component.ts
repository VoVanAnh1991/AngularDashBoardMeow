import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import firebase from 'firebase';

@Component({
  selector: 'app-view-ongoing-tasks',
  templateUrl: './view-ongoing-tasks.component.html',
  styleUrls: ['./view-ongoing-tasks.component.scss']
})
export class ViewOngoingTasksComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }
  
  adminId: string;
  loading: boolean = true;
  list : Array <any> = [];
  adminList : Array <any> = [];
  dataSource: any;
  displayedColumns: string[]=[
    "no", "assigned", "task", "from", "taskGiverId", "to", "data_created", "action"
  ];
  
  adding: boolean = false;
  deleting: boolean = false;
  
  newTaskForm = new FormGroup({
    task: new FormControl(''),
    to: new FormControl(''),
  });

  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor( 
    public adminTeamService: AdminTeamService,
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

  assignTaskSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.adminTeamService.updateTask(actionInfo, {to: this.adminId});
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      if (info.dismissedByAction) 
        this.alertSnackBar('Move this task to your Task List".')
      else {
        this.adminTeamService.updateTask(actionInfo, {to: null})
        this.alertSnackBar('Cancel assign task.');
      }     
    })
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 3000,
      ...this.snackBarStyle
    });
  }

}
