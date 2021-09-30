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

  removeRoomMember(roomId: string, newRoomUserIds: any){
    return this.db.doc('userRooms/'+roomId).update({roomUserIds: newRoomUserIds})
  }
  
  update(user: any){
    return this.db.collection("userRooms").doc(user.id).update(user);
  }
  
  addRoom(id: string, message: any){
    return this.db.collection("userRooms");
  }
  
  onDeleteUser(id: string){
    return this.db.collection("userRooms", ref => ref.where('roomUserIds','array-contains',id)
    .where('roomType','in',['userFriends','userKeepbox'])).snapshotChanges();
  }
  
  delete(id: string){
    return this.db.collection("userRooms").doc(id).delete();
  }

  sendMessageToUser(userId: string, message: any){
    this.db.doc('userRooms/AMIN'+userId).get().subscribe(result => 
      result.data()? 
        this.db.doc('userRooms/AMIN'+userId).update({
          lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
        })
        : 
        this.db.doc('userRooms/AMIN'+userId).set({
          lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
          roomStr: JSON.stringify(["AdminTeam", userId].sort()),
          roomType: 'userFriends',
          roomUserIds: ["AdminTeam", userId],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }) 
    );
    this.db.collection('userRooms/AMIN'+userId+'/messages').add(message);
  }
}
