import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../model/login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = environment.apiBaseUrl;

  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUserDoctorMama')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(login: string, password: string) {
    const body = {login, password};
    body.login = login;
    body.password = password;

    return this.http.post<any>('/api/auth/admin', body)
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUserDoctorMama', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          return null;
        }
      }));

  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUserDoctorMama');
    this.currentUserSubject.next(null);
  }
}
