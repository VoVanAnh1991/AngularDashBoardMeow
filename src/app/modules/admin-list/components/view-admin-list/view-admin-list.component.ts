import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-admin-list',
  templateUrl: './view-admin-list.component.html',
  styleUrls: ['./view-admin-list.component.scss']
})
export class ViewAdminListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarStyle = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    panelClass: ['my-snack-bar'],
  }

  loading: boolean = true;
  list : Array <any> = [];
  onlineUsers: any;
  dataSource: any;
  displayedColumns: string[]=[
    "no", "avatar", "id", "username", "email", "last_actived"
  ];
  
  editing: boolean = false;
  editingId: string;
  
  newUserForm = new FormGroup({
    username: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
  });

  adding: boolean = false;
  deleting: boolean = false;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor( 
    public adminTeamService: AdminTeamService,
    ) { 
      
  }
  
  ngOnInit(): void {
    this.adminTeamService.getAllAdmins().subscribe((result)=>{
      this.list = result.map((item, index)=>{
        return {
          no: index + 1 , 
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      })
      this.dataSource = new MatTableDataSource<any>(this.list)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })    
  }

  applyFilter(filterValue: string): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  
}
