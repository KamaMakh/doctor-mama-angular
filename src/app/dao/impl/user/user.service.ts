import {Injectable} from '@angular/core';
import {UserDao} from '../../interface/user/UserDao';
import {Observable} from 'rxjs';
import {UserResponseAfterUpdate, UsersResponse} from '../../../model/user/UserResponse';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SleepDurationResponse} from '../../../model/charts/SleepDuration';

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

  updatePassword(id: number, newPassword: string): Observable<UserResponseAfterUpdate> {
    return this.http.post<UserResponseAfterUpdate>(`/api/admin/user/${id}/password?id=${id}&newPassword=${newPassword}`, {
      id,
      newPassword
    });
  }

  delete(id: number): Observable<UserResponseAfterUpdate> {
    return this.http.post<UserResponseAfterUpdate>(`/api/admin/user/${id}`, id);
  }
}
