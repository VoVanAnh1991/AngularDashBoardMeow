import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tasks-list',
  templateUrl: './view-tasks-list.component.html',
  styleUrls: ['./view-tasks-list.component.scss']
})
export class ViewTasksListComponent implements OnInit {
  links=[{url:'/ongoing-tasks', name: 'Ongoing Tasks'}, {url:'/my-tasks', name: 'My Tasks'}, {url:'/completed-tasks', name: 'Completed Tasks'}]
  constructor() { }

  activeLink: string;

  ngOnInit() {
  }


}
