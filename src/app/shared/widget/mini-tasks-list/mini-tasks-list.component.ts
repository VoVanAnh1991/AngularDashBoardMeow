import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import firebase from 'firebase';

@Component({
  selector: 'app-mini-tasks-list',
  templateUrl: './mini-tasks-list.component.html',
  styleUrls: ['./mini-tasks-list.component.scss']
})
export class MiniTasksListComponent implements OnInit { 
  adminId: string
  loading: boolean = true;
  list : Array <any> = [];
  dataSource: any;
  displayedColumns: string[]=[
    "no", "assigned", "task", "from", "taskGiverId"
  ];

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
  
}
