import {Injectable} from '@angular/core';
import {UserDao} from '../../interface/user/UserDao';
import {Observable} from 'rxjs';
import {UsersResponse} from '../../../model/user/UserResponse';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserDao {

  url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  findAll(page: number, email?: string): Observable<UsersResponse> {
    let eMail = '';
    if (email) {
      eMail = '&email=' + email;
    }
    return this.http.get<UsersResponse>('/api/admin/user?page=' + page + eMail);
  }
}
