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
    let userStatuses: Array<any>;
    this.db.collection("status").snapshotChanges().subscribe(
      result => { 
        userStatuses = result.map ( doc => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as {})
        }})

        let today = Math.floor(new Date().valueOf()/1000)
        userStatuses.forEach((userStatus: any) => {
          let lastChanged: any;
          userStatus.lastChanged? 
           (lastChanged = userStatus.lastChanged.seconds)
           : (lastChanged = 0);

          if(today - lastChanged > 36000 && userStatus.status == "online") {
            this.db.doc('status/'+userStatus.id).update({status: "offline"})
          }
        })
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
