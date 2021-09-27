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
  
  onDeleteUser(id: string){
    return this.db.collection("userRooms", ref => ref.where('roomUserIds','array-contains',id)
    .where('roomType','in',['userFriends','userKeepbox'])).snapshotChanges();
  }
  
  delete(id: string){
    return this.db.collection("userRooms").doc(id).delete();
  }

}
