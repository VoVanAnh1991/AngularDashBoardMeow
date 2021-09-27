import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor( private db: AngularFirestore) { }

  getRooms(){
    return this.db.collection("rooms").snapshotChanges();
  }

  updateRooms(roomId: string, roomInfo: any){
    return this.db.collection("rooms").doc(roomId)
    .update(roomInfo);
  }

  deleteRooms(id: string){
    return this.db.collection('rooms').doc(id).delete();
  }
}
