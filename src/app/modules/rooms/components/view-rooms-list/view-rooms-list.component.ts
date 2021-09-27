import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-view-rooms-list',
  templateUrl: './view-rooms-list.component.html',
  styleUrls: ['./view-rooms-list.component.scss']
})
export class ViewRoomsListComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.openSnackBar('Hi','Bye')
  }
  
  openSnackBar(mess: string, action: string): void {     
    let config = new MatSnackBarConfig();
    config.panelClass = 'hello';
    let snackBarRef = this._snackBar.open(mess, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'my-snack-bar',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  }

}
