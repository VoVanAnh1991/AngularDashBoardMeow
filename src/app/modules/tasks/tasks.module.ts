import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { ViewTasksListComponent } from './components/view-tasks-list/view-tasks-list.component';
import { ViewOngoingTasksComponent } from './components/view-ongoing-tasks/view-ongoing-tasks.component';
import { ViewMyTasksComponent } from './components/view-my-tasks/view-my-tasks.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatTableModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCompletedTasksComponent } from './components/view-completed-tasks/view-completed-tasks.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ViewTasksListComponent, ViewOngoingTasksComponent, ViewMyTasksComponent, ViewCompletedTasksComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    TasksRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
  ]
})
export class TasksModule { }
