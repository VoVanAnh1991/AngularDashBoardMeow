import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { AdminTeamService } from 'src/app/services/admin-team.service';
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

  loading: boolean = true;
  list : Array <any> = [];
  onlineUsers: any;
  dataSource: any;
  displayedColumns: string[]=[
    "no", "avatar", "id", "username", "email", "last_actived"
  ];
  xlsxColumns: string[]=[
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
