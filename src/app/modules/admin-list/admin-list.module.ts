import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminListRoutingModule } from './admin-list-routing.module';
import { ViewAdminListComponent } from './components/view-admin-list/view-admin-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRadioModule, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewAdminListComponent],
  imports: [
    CommonModule,
    AdminListRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
  ]
})
export class AdminListModule { }
