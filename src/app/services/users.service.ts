import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor( public db: AngularFirestore) { }
 
  getAllUsers(){
    return this.db.collection("users", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  getOnlineUsers(){
    return this.db.collection("status", ref => ref.where("status",'==',"online")).snapshotChanges();
  }

  upadateOnlineUsers(){
    let status;
    this.db.collection("status").snapshotChanges().subscribe(
      result => { 
        status = result.map ( doc => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as {})
          }})

        let lastChanged = status.last_changed.seconds
        let today = Math.floor(new Date().valueOf()/1000)
        console.log(status.id);
        if(today - lastChanged > 9000) {
          this.db.doc('status/'+status.id).update({status: "offline"})
        }
      }
    );
  }

  update(user: any, id: string){
    return this.db.collection("users").doc(id).update(user);
  }

  delete(id: string){
    return this.db.collection('users').doc(id).delete();
  }

  addNewUser(newUser: any){
    this.db.collection('users').add({
      username: newUser.username,
      nickname: newUser.username,
      password: newUser.password,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      avatar: 'https://my-meow-chat.web.app/AdminLogo.png',
      isAdmin: true,
    });
  }
}
