import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoomsRoutingModule } from './user-rooms-routing.module';
import { ViewUserRoomsListComponent } from './components/view-user-rooms-list/view-user-rooms-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ViewUserRoomsListComponent],
  imports: [
    CommonModule,
    UserRoomsRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class UserRoomsModule { }