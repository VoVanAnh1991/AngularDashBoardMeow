import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-users-list',
  templateUrl: './view-users-list.component.html',
  styleUrls: ['./view-users-list.component.scss']
})
export class ViewUsersListComponent implements OnInit {
  loading: boolean = true;
  lists : Array <any> = [];
  onlineUsers: any;
  dataSource;
  displayedColumns: string[]=[
    "no", "id", "username", "nickname", "email", "isGGUser", "data_created", "action"
  ];
  
  editing: boolean = false;
  editingId: string;
  
  newUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  adding: boolean = false;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor( 
    public usersService: UsersService,
    public userRoomsService: UserRoomsService,
    private _snackBar: MatSnackBar
    ) { 
      this.usersService.upadateOnlineUsers()
      this.alertSnackBar('Hello');
  }
  
  ngOnInit(): void {
    this.usersService.getOnlineUsers().subscribe(statuses => {
      this.onlineUsers = statuses.map( doc => {
        return doc.payload.doc.id
      });
    })
    this.usersService.getAllUsers().subscribe((result)=>{
      this.lists = result.map((item, index)=>{
        return {
          no: result.length - index , 
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      })
      this.dataSource = new MatTableDataSource<any>(this.lists)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })    
  }

  applyFilter(filterValue): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEditUser(id: string){
    this.editing = true;
    this.editingId = id;
  }

  onDeleteUser(id:string){
    if (confirm('Delete user "' + id + '" \n All of this user\'s Personal Chats & Keepboxes will be deleted!')) {
      this.usersService.delete(id);
      this.userRoomsService.onDeleteUser(id).subscribe(result => result.map(room => {
        this.userRoomsService.delete(room.payload.doc.id)
      }))
    }
  }

  onCancel(){
    this.editing = false;
    this.editingId = null;
  }

  onSaveUser(user: any){
    let {no, id, ...updateInfo} = user;
    this.usersService.update(updateInfo, id).then(() => {
      this.editing = false;
      this.editingId = null;
      this.alertSnackBar('Save successfully')
    })
  }

  onAddUser() {  
    this.adding = true;
  }

  onCancelAddUser() {  
    this.adding = false;
    this.applyFilter('');
  }

  onSubmit() {
    let newUser = this.newUserForm.value;
    this.applyFilter(newUser.username); 
    let usernameList = this.dataSource.filteredData.map(result => result.username);

    if (usernameList.includes(newUser.username))
    alert('Username is existed!') 
    else {
      let goCreate;
      goCreate = confirm('Create new user?')
      goCreate? this.usersService.addNewUser(newUser) : alert ('Cancel creating new user.')
    }
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      // duration: 2000,
    });
  }

  addUserSnackBar(mess: string, action: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  }
}
