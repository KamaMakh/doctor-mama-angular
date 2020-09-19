import {Observable} from 'rxjs';
import {ChildrenResponse} from '../../../model/children/Children';

export interface ChildrenDao {
  findAll(page: number): Observable<ChildrenResponse>;
}
