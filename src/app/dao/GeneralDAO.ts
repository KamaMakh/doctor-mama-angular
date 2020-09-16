import {Observable} from 'rxjs';
import {GeneralResponse} from '../model/GeneralResponse';

export interface GeneralDAO<T> {
  update(obj: T): Observable<T>;
  getOne(id: number): Observable<T>;
  delete(id: number): Observable<GeneralResponse>;
}
