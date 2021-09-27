import { Component, OnInit } from '@angular/core';
import { AddminTeamService } from 'src/app/services/addmin-team.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  adminInfo : any;
  constructor(
    public adminTeamService: AddminTeamService,

  ) {
    this.adminTeamService.getCurrentAdmin();
    this.adminInfo = this.adminTeamService.adminInfo;
  }

  ngOnInit(): void {
  }

}
