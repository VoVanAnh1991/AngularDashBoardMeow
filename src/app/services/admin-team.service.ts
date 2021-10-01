import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminTeamService {
  adminInfo: any;

  constructor( public db: AngularFirestore ) { }

  getCurrentAdmin() {
    let currentAdmin: any;
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
      lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    })
    return this.adminInfo
  }
  
  getAllAdmins(){
    return this.db.collection('adminTeam/adminManager/admins/').snapshotChanges();
  }

  getOneAdmin(id: string){
    return this.db.doc('adminTeam/adminManager/admins/'+id).get();
  }

  getCompletedTasks(){
    return this.db.collection('adminTeam/tasks/completedTasks', ref => ref.orderBy('completedDate', 'desc'))
    .snapshotChanges()
  }
  getOngoingTasks(){
    return this.db.collection('adminTeam/tasks/ongoingTasks', ref => ref.orderBy('timestamp', 'desc'))
    .snapshotChanges()
  }
  
  addTask(task: any){
    this.db.collection('adminTeam/tasks/ongoingTasks').add(task);
  }

  updateTask(id: string, updateInfo: any){
    this.db.doc('adminTeam/tasks/ongoingTasks/'+id).update(updateInfo)
  }

  deleteTask(id:string){
    this.db.doc('adminTeam/tasks/ongoingTasks/'+id).delete();
  }

  sendToCompletedTasks(id: string, task: any){
    let adminId = JSON.parse(localStorage.getItem('adminDashboard')).email;
    this.db.doc('adminTeam/tasks/completedTasks/'+id).set({
      ...task,
      completedBy: adminId,
      completedDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.db.doc('adminTeam/tasks/ongoingTasks/'+id).delete();
  }
  
  getAdminChatRoom() {
    return this.db.collection('adminTeam/chatRoom/messages', ref => ref.orderBy('timestamp','desc')).snapshotChanges();  
  }

  sendMessageToAdmins(message: any, ...additional: any){
    this.db.collection('adminTeam/chatRoom/messages').add({...message, ...additional});
  }
}
