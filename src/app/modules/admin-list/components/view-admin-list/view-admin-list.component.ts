import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';

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
  isRemovedAdmins: boolean = false;
  loading: boolean = true;
  list : Array <any> = [];
  onlineUsers: any;
  dataSource: any;
  adminCode: Array<string>;
  displayedColumns: string[]=[
    "no", "avatar", "id", "username", "email", "last_actived", "action"
  ];
  xlsxColumns: string[]=[
    "no", "avatar", "id", "username", "email", "last_actived"
  ];
  
  allAdmins: Array<any>;
  deleting: boolean = false;
  deletingId: string;
  recorvering: any;
  recorveringId: string;
  
  newUserForm = new FormGroup({
    username: new FormControl('', [ Validators.required]),
    password: new FormControl('', [ Validators.required]),
  });
  
  pageSizeOptions: number;
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  @ViewChild('TABLE', {static: true}) table: ElementRef;
  
  exportAsExcel()
  {
    let excelList = this.list.map(admin => {
      return {
        no: admin.no,
        id: admin.id,
        username: admin.username,
        email: admin.email,
      }
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelList);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Admin List');
    XLSX.writeFile(wb, 'Admin List.xlsx');
  }

  exportFilterAsExcel()
  {
    const wsF: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wbF: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wbF, wsF, 'Admin List (Filtered)');
    XLSX.writeFile(wbF, 'Admin List (Filtered).xlsx');
  }

  constructor( 
    public adminTeamService: AdminTeamService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    ) { 
    this.adminTeamService.getAdminCode().subscribe(result => {
      let info: any = {...result.payload.data() as {}}
      this.adminCode = info.adminCode;
    });
  }

  ngOnInit(): void {
    this.adminTeamService.getAllAdmins().subscribe((result)=>{
      this.allAdmins = result.map(item=>{
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as {}),
        }
      })
      this.list = this.allAdmins.filter(admin => this.isRemovedAdmins? (admin.isRemoved === true) : (admin.isRemoved !== true));
      this.list.map((admin,index) => this.list[index].no = index + 1);
      this.dataSource = new MatTableDataSource<any>(this.list)
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })    
  }

  changeList(){
    this.list = this.allAdmins.filter(admin => this.isRemovedAdmins? (admin.isRemoved === true) : (admin.isRemoved !== true));
    this.list.map((admin,index) => this.list[index].no = index + 1);
    this.dataSource = new MatTableDataSource<any>(this.list)
  }

  applyFilter(filterValue: string): void {
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onChangeAdminCode(): void {
    let newCode = prompt("Enter new Admin Code");
    newCode && confirm("Change amdin code to \""+newCode+"\" ?") &&
    this.authService.changeAdminCode(newCode)
  }

  onDeleteAdmin(id: string){
    this.deleting = true;
    this.deletingId = id;
    this.deleteUserRoomSnackBar(`Remove admin " ${id} "`, 'Delete', id);
  }
  
  deleteUserRoomSnackBar(mess: string, action: string, actionInfo: string): void {   
    let snackBarRef = this._snackBar.open(mess, action, {
      duration: 3000,
      ...this.snackBarStyle,
    });
    snackBarRef.onAction().subscribe(() => {
      this.adminTeamService.deleteAdmin(actionInfo);
    });
    snackBarRef.afterDismissed().subscribe((info) => {
      this.deleting = false;
      this.deletingId = null;
      info.dismissedByAction? 
        this.alertSnackBar('Admin is removed.')
        : this.alertSnackBar('Cancel removing Admin.')
    })
  }

  onRecoverAdmin(id: string){
    this.recorveringId = id;
    this.adminTeamService.recoverAdmin(id);
    this.isRemovedAdmins = true;
  }

  alertSnackBar(mess: string): void {   
    this._snackBar.open(mess, null, {
      duration: 2000,
      ...this.snackBarStyle
    });
  }
}
