import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { UserRoomsService } from 'src/app/services/user-rooms.service';
import { UsersService } from 'src/app/services/users.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-users-list',
  templateUrl: './view-users-list.component.html',
  styleUrls: ['./view-users-list.component.scss']
})
export class ViewUsersListComponent implements OnInit {
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
    "no", "id", "username", "nickname", "email", "isGGUser", "date_created", "action"
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

  @ViewChild('TABLE', {static: true}) table: ElementRef;
    
  constructor( 
    public usersService: UsersService,
    public userRoomsService: UserRoomsService,
    private _snackBar: MatSnackBar
  ) { 
    this.usersService.upadateOnlineUsers();
  }
  
  ngOnInit(): void {
    this.usersService.getOnlineUsers().subscribe(statuses => {
      this.onlineUsers = statuses.map( doc => {
        return doc.payload.doc.id
      });
    })
    this.usersService.getAllUsers().subscribe((result)=>{
      this.list = result.map((item, index)=>{
        return {
          no: result.length - index , 
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      })
      this.dataSource = new MatTableDataSource<any>(this.list)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })    
  }
  
  exportAsExcel()
  {
    let excelList = this.list.map(user => {
      let dummy = user;
      delete dummy.password;
      delete dummy.lastChanged;
      return {
        ...dummy,
        timestamp: user.timestamp.toDate().toLocaleString(),
      }
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'User List');
    XLSX.writeFile(wb, 'User List.xlsx');
  }

  exportFilterAsExcel()
  {
    const wsF: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wbF: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wbF, wsF, 'User List (Filtered');
    XLSX.writeFile(wbF, 'User List (Filtered).xlsx');
  }


  applyFilter(filterValue: string): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onEditUser(id: string){
    this.editing = true;
    this.editingId = id;
  }

  onDeleteUser(id:string){
    this.deleting = true;
    this.deleteUserSnackBar(
      'Delete user "' + id + '". Please notice that All of this user\'s Personal Chats & Keepboxes will be deleted!',
      'Delete', id
    );
  }

  deleteUserSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 8000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.usersService.delete(actionInfo);
      this.userRoomsService.onDeleteUser(actionInfo).subscribe(result => result.map(room => {
        this.userRoomsService.delete(room.payload.doc.id)
      }))
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      info.dismissedByAction? 
        this.alertSnackBar('User is deleted.')
        : this.alertSnackBar('Cancel deleting user.')
    })
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
    this.alertSnackBar('Username is existed!') 
    else {
      this.usersService.addNewUser(newUser);
      this.newUserForm.reset();
    }
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 3000,
      ...this.snackBarStyle
    });
  }

}
