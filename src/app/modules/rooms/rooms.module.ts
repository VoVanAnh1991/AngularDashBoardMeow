import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ViewRoomsListComponent } from './components/view-rooms-list/view-rooms-list.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewRoomsListComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class RoomsModule { }
