import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AddminTeamService {
  adminInfo: any;

  constructor( public db: AngularFirestore ) { }

  getCurrentAdmin() {
    let currentAdmin;
    currentAdmin = JSON.parse(localStorage.getItem('adminDashboard'));
    this.adminInfo = {
      username : 
        currentAdmin.displayName? currentAdmin.displayName
        : currentAdmin.email.slice(0, currentAdmin.email.search('@')),
      email: currentAdmin.email,
      avatar: currentAdmin.photoURL,
    }
    this.db.doc('adminTeam/adminManager/admins/'+this.adminInfo.email)
    .set({
      ...this.adminInfo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }
  
}
