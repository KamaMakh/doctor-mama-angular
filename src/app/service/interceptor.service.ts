import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  currentUser;
  role: string;
  enabledURLs: string[];
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqUrl = environment.apiBaseUrl;
    if (!request.url.includes('/api/auth/admin')) {
      if (localStorage.getItem('currentUserDoctorMama')) {
        this.currentUser = localStorage.getItem('currentUserDoctorMama') ? JSON.parse(localStorage.getItem('currentUserDoctorMama')) : '';
        this.role = this.currentUser?.roles[0]?.role;
        if (this.role === 'admin') {
          this.enabledURLs = ['users', 'commercial', 'webinars', 'children', 'consultants'];
        } else {
          this.enabledURLs = ['users', 'children', 'charts'];
        }
        let enableURL = false;
        this.enabledURLs.forEach(url => {
          if (location.href.indexOf(url) > -1) {
            enableURL = true;
          }
        });
        if (!enableURL) {
          this.router.navigate(['users']);
          return;
        }
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Bearer ' + this.currentUser.accessToken
          ),
          url: reqUrl + '' + request.url,
        });
      } else {
        this.authenticationService.logout();
        this.router.navigate(['login'], {queryParams: {returnUrl: request.url}});
        return;
      }
    } else {
      request = request.clone({
        url: reqUrl + '' + request.url,
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['login'], {queryParams: {returnUrl: request.url}});
        }
        return throwError(err);
      })
    );
  }
}
