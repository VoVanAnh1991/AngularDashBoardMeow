import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  email: string;
  isRemoved: boolean;
  adminCode: string;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth ,
    private db: AngularFirestore ,
  ) { this.afAuth.authState.subscribe((user)=>{
    if(user && user.emailVerified == true){
        localStorage.setItem('adminDashboard', JSON.stringify(user));
        this.router.navigate([''])
      }
    })
  }

  getAdminCode (): Observable<any> {
    return this.db.doc('adminTeam/adminManager').get();
  }

  changeAdminCode (code: string) {
    this.db.doc('adminTeam/adminManager').update({adminCode: [code]});
  }

  isLoggin (): boolean { 
    const user = JSON.parse(localStorage.getItem('adminDashboard'));
      user &&
        this.db.doc('adminTeam/adminManager/admins/'+user.email).snapshotChanges()
        .subscribe((info: any) => {
          this.isRemoved = info.payload.data().isRemoved;
            if ( this.isRemoved == true){
                localStorage.removeItem('adminDashboard'); 
                this.afAuth.signOut();
            }
        })
    return user !== null? true : false
  }

  authSignIn(provider: any){
    return this.afAuth.signInWithPopup(provider)
    .then((result: any) => {
      alert('You have successfully logged in');
    })
    .catch((error: any) => {
      alert(error.message);
    })
  }
  
  signIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result)=>{
      if(result.user.emailVerified == true){
        localStorage.setItem('adminDashboard', JSON.stringify(result.user));
        this.router.navigate([''])
        this.email = result.user.email
      }
      else {
        alert('Email address haven\'t been verified. \nPlease check your inbox & verify.')
        this.router.navigate(['verify-email'])
      }
    })
    .catch((error: any) => {
      alert(error.message);
    })
  }
  
  googleAuth() {
    return this.authSignIn(new firebase.auth.GoogleAuthProvider())
  }
  
  signOut(){
    return this.afAuth.signOut().then(()=>{
      this.router.navigate(['login']);
      localStorage.removeItem('adminDashboard')
    })
    
  }

  signUp(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.email = email;
      this.sendVerificationEmail();
    }).catch((error: any) => {
      alert(error.message);
    })
  }

  sendVerificationEmail() {
    return this.afAuth.currentUser.then((user)=>{
      user.sendEmailVerification()
      .then(()=>{
        this.router.navigate(['verify-email'])
      })
    })
  }
  
  forgotPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email).then(()=>{
      alert("Email is sent");
    })
    .catch(error => {
      alert(error.message);
    })
  }

}
