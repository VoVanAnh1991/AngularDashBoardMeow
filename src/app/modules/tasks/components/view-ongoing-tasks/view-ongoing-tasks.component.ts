import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    "no", "assigned", "task", "from", "taskGiverId", "to", "date_created", "action"
  ];
  
  adding: boolean = false;
  deleting: boolean = false;
  
  newTaskForm = new FormGroup({
    task: new FormControl('', [Validators.required]),
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

    this.adminTeamService.getOngoingTasks().subscribe(tasks => {
      this.list = tasks.map((task, index) => {
        return {
          taskMessage: null,
          no: tasks.length -index,
          id: task.payload.doc.id,
          ...(task.payload.doc.data() as {})
        }
      })

      this.adminTeamService.getAllAdmins().subscribe(admins => {
        this.adminList = admins.map(admin => {
          return {
            ...(admin.payload.doc.data() as {}),
          }
        })
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

  onAssignTask(taskId: string){
    this.adminTeamService.updateTask(taskId, {to: this.adminId});
  }
  
  onAddTask() {  
    this.adding = true;
  }

  onCancelAddTask() {  
    this.adding = false;
    this.applyFilter('');
  }

  onSubmit() {
    let newTask = {
      ...this.newTaskForm.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      from: 'admin',
      adminId: this.adminId,
    };
    
    this.adminTeamService.addTask(newTask);
    this.newTaskForm.reset();
  }

  onDeleteTask(id:string, task: string){
    this.deleting = true;
    this.deleteTaskSnackBar(
      `Delete task " ${task} "?`, 'Delete', id
    );
  }

  deleteTaskSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.adminTeamService.deleteTask(actionInfo);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      info.dismissedByAction? 
        this.alertSnackBar('Task is deleted.')
        : this.alertSnackBar('Cancel deleting task.')
    })
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 3000,
      ...this.snackBarStyle
    });
  }

  alertLongerSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 5000,
      ...this.snackBarStyle
    });
  }

}
