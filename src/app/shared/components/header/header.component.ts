import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";


@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
    @Output () toogleSidebar : EventEmitter <any> = new EventEmitter()

    constructor (public authService: AuthService) {

    }

    ngOnInit() {}

    handleToggleSidebar() {
        this.toogleSidebar.emit();
      }
    

}