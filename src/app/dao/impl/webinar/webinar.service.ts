import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebinarDAO} from '../../interface/webinar/WebinarDAO';
import {WebinarRequest, WebinarResponse} from '../../../model/webinar/Webinar';
import {Observable} from 'rxjs';
import {UsersResponse} from '../../../model/user/UserResponse';

@Injectable({
  providedIn: 'root'
})

export class WebinarService implements WebinarDAO{
  constructor(private http: HttpClient) {
  }

  create(data: WebinarRequest): Observable<WebinarRequest> {
    return this.http.post<WebinarRequest>('/api/admin/webinar', data);
  }

  getAll(): Observable<WebinarResponse[]> {
    return this.http.get<WebinarResponse[]>('/api/webinar');
  }

  getOne(id: number): Observable<WebinarResponse> {
    return undefined;
  }

  edit(data: WebinarRequest): Observable<WebinarRequest> {
    return this.http.post<WebinarRequest>('/api/admin/webinar', data);
  }
}
