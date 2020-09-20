import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './helpers/auth-guard.service';
import {LoginComponent} from './views/login/login.component';
import {HomeComponent} from './views/home/home.component';
import {UserComponent} from './views/user/user.component';
import {ChildAvatarComponent} from './views/child-avatar/child-avatar.component';
import {DirectoryComponent} from './views/directory/directory.component';
import {ActivityTypesComponent} from './views/activity-types/activity-types.component';
import {SleepingAssociationsComponent} from './views/sleeping-associations/sleeping-associations.component';
import {SleepDurationComponent} from './views/sleep-duration/sleep-duration.component';
import {CommercialComponent} from "./views/commercial/commercial.component";
import {ChildrenComponent} from './views/children/children.component';

const directoriesRoutes: Routes = [
  {
    path: 'directories',
    component: DirectoryComponent
  },
  {
    path: 'directories/activity_types',
    component: ActivityTypesComponent
  },
  {
    path: 'directories/sleeping_associations',
    component: SleepingAssociationsComponent
  }
];

const usersRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/:id/children',
    component: ChildrenComponent
  }
];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'avatars',
        component: ChildAvatarComponent
      },
      {
        path: 'commercial',
        component: CommercialComponent
      },
      {path: '', redirectTo: '/users', pathMatch: 'full'},
      {
        path: 'charts',
        component: SleepDurationComponent
      },
      ...directoriesRoutes,
      ...usersRoutes
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
