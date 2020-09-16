import {Observable} from 'rxjs';
import {UsersResponse} from '../../../model/user/UserResponse';

export interface UserDao {
  findAll(page: number, email?: string): Observable<UsersResponse>;
}
