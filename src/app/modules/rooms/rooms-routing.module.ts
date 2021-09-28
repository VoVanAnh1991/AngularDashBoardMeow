import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DefaultComponent } from 'src/app/shared/layouts/default/default.component';
import { OptionAnnouncementHistoryComponent } from './components/option-announcement-history/option-announcement-history.component';
import { OptionShowInfoComponent } from './components/option-show-info/option-show-info.component';
import { OptionShowMessagesComponent } from './components/option-show-messages/option-show-messages.component';
import { ViewRoomsListComponent } from './components/view-rooms-list/view-rooms-list.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'rooms',
      component: ViewRoomsListComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'show-info/:id',
          component: OptionShowInfoComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'show-messages/:id',
          component: OptionShowMessagesComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'history/:id',
          component: OptionAnnouncementHistoryComponent,
          canActivate: [AuthGuard]
        },  
      ]
    },
  ]
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
