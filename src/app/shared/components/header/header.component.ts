import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material";
import { AuthService } from "src/app/services/auth.service";


@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
    @Output () toggleSidebar : EventEmitter <any> = new EventEmitter()
    
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    snackBarStyle = {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['my-snack-bar'],
    }

    
    constructor (
        public authService: AuthService,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit() {}

    handleToggleSidebar() {
        this.toggleSidebar.emit();
    }
    
    onSignOut() {
        this.onSignOutSnackBar('Sign Out?','Ok')
    }

    onSignOutSnackBar(mess: string, action: string): void {   
        let snackBarRef = this._snackBar.open(mess, action, {
            duration: 2000,
            ...this.snackBarStyle,
        });
        snackBarRef.onAction().subscribe(() => {
            this.authService.signOut();
        });
        snackBarRef.afterDismissed().subscribe((info) => {
            !info.dismissedByAction && 
            this.alertSnackBar('Cancel Sign Out.')
        })
    }
    
    alertSnackBar(mess: string): void {   
        this._snackBar.open(mess, null, {
            duration: 2000,
            ...this.snackBarStyle
        });
    }

    onShowAboutSection(){
        this.onShowAboutSectionSnackBar('vva.dev.1991@gmail.com','OK')
    }

    onShowAboutSectionSnackBar(mess: string, action: string): void {   
        this._snackBar.open(mess, action, {
            ...this.snackBarStyle,
        });
    }
}