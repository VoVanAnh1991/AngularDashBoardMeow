import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase  from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor( private db: AngularFirestore) { }

  getRooms(){
    return this.db.collection("rooms").snapshotChanges();
  }

  getRoomMessages(roomId: string){
    return this.db.collection("rooms/"+roomId+"/messages", ref => ref.orderBy('timestamp','desc')).snapshotChanges();
  }

  getRoomInfo(roomId: string){
    return this.db.doc("rooms/"+roomId).snapshotChanges();
  }

  addRoom(newRoomName: string) {
    let adminEmail = JSON.parse(localStorage.getItem('adminDashboard')).email;
    this.db.collection('rooms')
      .add({
        roomName: newRoomName,
        createdBy: adminEmail,
        roomType: 'rooms',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(result => {
        this.db.doc('rooms/'+result.id).update({roomId: result.id})
      })
  }

  updateRoomNames(roomId: string, newName: any){
    let adminEmail = JSON.parse(localStorage.getItem('adminDashboard')).email;
    return this.db.collection("rooms").doc(roomId)
    .update({
      roomName: newName,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdatedBy: adminEmail,
      updatedAction: 'Change Room Name'
    });
  }

  isUpdated(roomId: string){
    let adminEmail = JSON.parse(localStorage.getItem('adminDashboard')).email;
    return this.db.collection("rooms").doc(roomId)
    .update({
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdatedBy: adminEmail,
      updatedAction: 'Delete all messages.',
    });
  }

  sendAnnouncement(roomId,newAnnouncement: string){
    let adminEmail = JSON.parse(localStorage.getItem('adminDashboard')).email;
    this.db.collection('rooms').doc(roomId).update({
            lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return this.db.collection('rooms/'+roomId+'/messages').add({
      message: newAnnouncement,
      user: 'Admin Team',
      userId: 'AdminTeam',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      announcedBy: adminEmail,
    })

  }

  deleteRoom(id: string){
    return this.db.collection('rooms').doc(id).delete();
  }

  onDeleteAllMessages(id: string){
    this.db.collection('rooms').doc(id).collection('messages').get().subscribe(messages => {
      messages.forEach(message => 
        this.db.doc('rooms/'+id+'/messages/'+message.id).delete()
      )
    });
  }
}
