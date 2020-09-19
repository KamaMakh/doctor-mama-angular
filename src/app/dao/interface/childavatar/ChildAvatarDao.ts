import {Observable} from 'rxjs';
import {ChildAvatarResponse, ChildAvatarsResponse} from '../../../model/childavatar/ChildAvatarResponse';

export interface ChildAvatarDao {
  findAll(page: number): Observable<ChildAvatarsResponse>;
  addAvatar(photo: any[]): Observable<ChildAvatarResponse[]>;
  deleteAvatar(id: number): Observable<ChildAvatarResponse[]>;
}
