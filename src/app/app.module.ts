import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {LoginComponent} from './views/login/login.component';
import {HomeComponent} from './views/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './service/interceptor.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {ToastrModule} from 'ngx-toastr';
import { UserComponent } from './views/user/user.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './views/footer/footer.component';
import {FooterDatePipe} from './pipe/footer-date.pipe';
import {getRussianPaginatorIntl} from './translate/PaginatorTranslate';
import { ChildAvatarComponent } from './views/child-avatar/child-avatar.component';
import { DirectoryComponent } from './views/directory/directory.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivityTypesComponent } from './views/activity-types/activity-types.component';
import { SleepingAssociationsComponent } from './views/sleeping-associations/sleeping-associations.component';
import { ChildAvatarDialogComponent } from './dialog/child-avatar-dialog/child-avatar-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SleepDurationComponent } from './views/sleep-duration/sleep-duration.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ChartsModule } from 'ng2-charts';
import { ChartFilterDialogComponent } from './dialog/chart-filter-dialog/chart-filter-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { CommercialComponent } from './views/commercial/commercial.component';
// import {ImageCropperModule} from 'ngx-image-cropper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditUserDialogComponent } from './dialog/edit-user-dialog/edit-user-dialog.component';
import {DeleteUserDialogComponent} from './dialog/delete-user-dialog/delete-user-dialog.component';
import { ChildrenComponent } from './views/children/children.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    FooterDatePipe,
    FooterComponent,
    ChildAvatarComponent,
    DirectoryComponent,
    ActivityTypesComponent,
    SleepingAssociationsComponent,
    ChildAvatarDialogComponent,
    SleepDurationComponent,
    ChartFilterDialogComponent,
    ConfirmDialogComponent,
    CommercialComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    ChildrenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    ChartsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useValue: getRussianPaginatorIntl()
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    }
  ],
  entryComponents: [
    ChildAvatarDialogComponent,
    ChartFilterDialogComponent,
    ChildAvatarDialogComponent,
    ConfirmDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
