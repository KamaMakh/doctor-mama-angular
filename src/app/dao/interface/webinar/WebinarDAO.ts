import {Observable} from 'rxjs';
import {WebinarRequest, WebinarResponse} from '../../../model/webinar/Webinar';

export interface WebinarDAO {
  getAll(): Observable<WebinarResponse[]>;
  getOne(id: number): Observable<WebinarResponse>;
  create(data: WebinarRequest): Observable<WebinarRequest>;
  edit(data: WebinarRequest): Observable<WebinarRequest>;
}
