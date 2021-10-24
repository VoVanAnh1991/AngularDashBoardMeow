import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AdminTeamService } from "../services/admin-team.service";
import { AuthService } from "../services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable ({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService, 
        ) {
    }

    canActivate (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {
        
        if (this.authService.isLoggin() !==true) {
            this.router.navigate(['login']);
        }
        return true;
    }
}