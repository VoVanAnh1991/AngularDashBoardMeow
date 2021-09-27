import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tasks-list',
  templateUrl: './view-tasks-list.component.html',
  styleUrls: ['./view-tasks-list.component.scss']
})
export class ViewTasksListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('adminDashboard'))
  }

}
