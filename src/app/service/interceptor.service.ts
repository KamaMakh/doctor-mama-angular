import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  public currentUser;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqUrl = environment.apiBaseUrl;
    if (!request.url.includes('/api/auth/admin')) {
      this.currentUser = localStorage.getItem('currentUserDoctorMama') ? JSON.parse(localStorage.getItem('currentUserDoctorMama')) : '';
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.currentUser.accessToken
        ),
        url: reqUrl + '' + request.url,
      });
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
