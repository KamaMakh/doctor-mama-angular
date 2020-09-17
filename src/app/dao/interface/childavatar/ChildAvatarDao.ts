import {Observable} from 'rxjs';
import {ChildAvatarResponse, ChildAvatarsResponse} from '../../../model/childavatar/ChildAvatarResponse';

export interface ChildAvatarDao {
  findAll(page: number): Observable<ChildAvatarsResponse>;
}
