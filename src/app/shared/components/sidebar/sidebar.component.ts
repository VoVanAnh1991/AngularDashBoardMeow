import { Component, OnInit } from '@angular/core';
import { AdminTeamService } from 'src/app/services/admin-team.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  adminInfo : any;
  constructor(
    public adminTeamService: AdminTeamService,

  ) {
    this.adminTeamService.getCurrentAdmin();
    this.adminInfo = this.adminTeamService.adminInfo;
  }

  ngOnInit(): void {
  }

}
