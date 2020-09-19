import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChildAvatarDao} from '../../interface/childavatar/ChildAvatarDao';
import {ChildAvatarResponse, ChildAvatarsResponse} from '../../../model/childavatar/ChildAvatarResponse';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildAvatarService implements ChildAvatarDao {

  url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  findAll(page: number): Observable<ChildAvatarsResponse> {
    return this.http.get<ChildAvatarsResponse>('/api/image?page=' + page);
  }

  addAvatar(photo: any[]): Observable<ChildAvatarResponse[]> {
    const formData = new FormData();
    photo.forEach(item => {
      formData.append('childImage', item);
    });
    return this.http.post<ChildAvatarResponse[]>('/api/admin/image', formData);
  }

  deleteAvatar(id: number): Observable<ChildAvatarResponse[]> {
    return undefined;
  }
}
