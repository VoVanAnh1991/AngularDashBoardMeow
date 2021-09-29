import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-dashboard-list',
  templateUrl: './view-dashboard-list.component.html',
  styleUrls: ['./view-dashboard-list.component.scss']
})
export class ViewDashboardListComponent implements OnInit {
  lists : Array <any> = []
  userDataSource: any;
  displayedColumns: string[]=[
    "id", "username", "password", "data_created"
  ];
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  constructor( public usersService: UsersService) { 
    
  }
  totalUsers: number = 0;
  totalWeekUsers: number = 0;
  totalMonthUsers: number = 0;

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe((result)=>{
      this.totalUsers = result.length;
      this.list = result.map((item)=>{
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      });
    result.filter((item:any) =>{
      new Date().getUTCMonth() + 1 === item.payload.doc.data().timestamp.toDate().getUTCMonth()+1 &&
      (this.totalMonthUsers += 1);
    })
    result.filter((item:any) =>{
        (this.totalWeekUsers += 1);
    })
        this.userDataSource = new MatTableDataSource<any>(this.list)
        this.userDataSource.paginator = this.paginator;
      })
    }


}
