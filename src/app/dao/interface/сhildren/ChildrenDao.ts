import {Observable} from 'rxjs';
import {Children, ChildrenResponse} from '../../../model/children/Children';

export interface ChildrenDao {
  findAll(page: number): Observable<ChildrenResponse>;
  findByUser(page: number, userId: number): Observable<ChildrenResponse>;
  getOne(id: number): Observable<Children>;
}
