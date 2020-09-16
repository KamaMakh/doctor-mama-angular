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
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './views/footer/footer.component';
import {FooterDatePipe} from './pipe/footer-date.pipe';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    FooterDatePipe,
    FooterComponent
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
