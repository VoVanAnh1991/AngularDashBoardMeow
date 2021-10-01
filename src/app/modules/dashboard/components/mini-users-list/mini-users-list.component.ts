import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mini-users-list',
  templateUrl: './mini-users-list.component.html',
  styleUrls: ['./mini-users-list.component.scss']
})
export class MiniUsersListComponent implements OnInit {
  dataSource: any;
  list : Array <any> = [];
  displayedColumns: string[]=[
    "no", "id", "username", "email", "date_created"
  ];

  constructor(
    public usersService: UsersService,
  ) { 
    this.usersService.getAllUsers().subscribe((result)=>{
      this.list = result.map((item, index)=>{
        return {
          no: result.length - index , 
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      }).splice(0,5);
      this.dataSource = new MatTableDataSource<any>(this.list)
    })
  }

  ngOnInit() {
  }

}
