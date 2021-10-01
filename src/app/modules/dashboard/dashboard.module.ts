import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewDashboardListComponent } from './components/view-dashboard-list/view-dashboard-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MiniUsersListComponent } from './components/mini-users-list/mini-users-list.component';
import { MiniTasksListComponent } from './components/mini-tasks-list/mini-tasks-list.component';
import { AdminChatRoomComponent } from './components/admin-chat-room/admin-chat-room.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [ViewDashboardListComponent,MiniUsersListComponent, MiniTasksListComponent,AdminChatRoomComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
})
export class DashboardModule { }
