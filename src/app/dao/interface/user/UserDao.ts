import {Observable} from 'rxjs';
import {UserResponseAfterUpdate, UsersResponse} from '../../../model/user/UserResponse';

export interface UserDao {
  findAll(page: number, email?: string): Observable<UsersResponse>;
  updatePassword(id: number, newPassword: string): Observable<UserResponseAfterUpdate>;
}
