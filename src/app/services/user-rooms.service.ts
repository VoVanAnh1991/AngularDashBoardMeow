import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserRoomsService {
  constructor( public db: AngularFirestore) { }
 
  getAllUserRooms(){
    return this.db.collection("userRooms", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  getQueryEqual(ar1: string, ar2: string){
    return this.db.collection("userRooms", ref => ref.where(ar1,'==',ar2)).snapshotChanges();
  }

  getCreatedByAdmin(){
    return this.db.collection("userRooms", ref => ref.where('roomUserIds','array-contains','AdminTeam')).snapshotChanges();
  }

  removeRoomMember(roomId: string, newRoomUserIds: any){
    return this.db.doc('userRooms/'+roomId).update({roomUserIds: newRoomUserIds})
  }
  
  onDeleteUser(id: string){
    return this.db.collection("userRooms", ref => ref.where('roomUserIds','array-contains',id)
    .where('roomType','in',['userFriends','userKeepbox'])).snapshotChanges();
  }
  
  delete(id: string){
    return this.db.collection("userRooms").doc(id).delete();
  }

  sendMessageToUser(userId: string, message: any){
    this.db.doc('userRooms/ADMIN'+userId).get().subscribe(result => 
      result.data()? 
        this.db.doc('userRooms/ADMIN'+userId).update({
          lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
        })
        : 
        this.db.doc('userRooms/ADMIN'+userId).set({
          lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
          roomStr: JSON.stringify(["AdminTeam", userId].sort()),
          roomType: 'userFriends',
          roomId: 'ADMIN'+userId,
          roomUserIds: ["AdminTeam", userId],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }) 
    );
    this.db.collection('userRooms/ADMIN'+userId+'/messages').add(message);
    this.db.doc('users/'+userId+'/status/'+'ADMIN'+userId).set({
      lastVisited: firebase.firestore.FieldValue.serverTimestamp(),
      roomType: 'userFriends',
      roomId: 'ADMIN'+userId,
    });
  }
}
