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
import {CommercialComponent} from './views/commercial/commercial.component';
import {ChildrenComponent} from './views/children/children.component';
import {WebinarsComponent} from './views/webinars/webinars.component';
import {ConsultantComponent} from './views/consultant/consultant.component';
import {ContractsComponent} from './views/contracts/contracts.component';
import {ContractDetailComponent} from './views/contracts/contract-detail/contract-detail.component';

const contractRoutes: Routes = [
  {
    path: 'contracts',
    component: ContractsComponent
  },
  {
    path: 'contracts/:id',
    component: ContractDetailComponent
  }
];

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

const chartsRoutes: Routes = [
  {
    path: 'charts',
    component: SleepDurationComponent
  },
  {
    path: 'charts/:childId',
    component: SleepDurationComponent
  },
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
      {
        path: 'webinars',
        component: WebinarsComponent
      },
      {
        path: 'consultants',
        component: ConsultantComponent
      },
      {path: '', redirectTo: '/users', pathMatch: 'full'},
      ...directoriesRoutes,
      ...usersRoutes,
      ...chartsRoutes,
      ...contractRoutes
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
