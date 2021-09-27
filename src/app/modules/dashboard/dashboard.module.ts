import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewDashboardListComponent } from './components/view-dashboard-list/view-dashboard-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ViewDashboardListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
  ],
})
export class DashboardModule { }
