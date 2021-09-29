import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ViewRoomsListComponent } from './components/view-rooms-list/view-rooms-list.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionShowInfoComponent } from './components/option-show-info/option-show-info.component';
import { OptionShowMessagesComponent } from './components/option-show-messages/option-show-messages.component';
import { OptionAnnouncementHistoryComponent } from './components/option-announcement-history/option-announcement-history.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ViewRoomsListComponent, OptionShowInfoComponent, OptionShowMessagesComponent, OptionAnnouncementHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    RoomsRoutingModule,
  ]
})
export class RoomsModule { }
