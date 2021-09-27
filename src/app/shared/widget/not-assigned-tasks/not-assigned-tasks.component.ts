import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-not-assigned-tasks',
  templateUrl: './not-assigned-tasks.component.html',
  styleUrls: ['./not-assigned-tasks.component.scss']
})
export class NotAssignedTasksComponent implements OnInit {
  tasks = [
    {name: 'Primary', completed: false, color: 'primary'},
    {name: 'Accent', completed: false, color: 'accent'},
    {name: 'Warn', completed: false, color: 'warn'}
  ];

  notAssigedTaskDataSource;
  displayedColumns: string[]=[
    "Assign", "Task" ,"User Id", "Date Created"
  ];

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  update(index) {
    this.tasks[index].completed = !this.tasks[index].completed
  }

}
