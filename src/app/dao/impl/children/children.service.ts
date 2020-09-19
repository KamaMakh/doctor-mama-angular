import {Injectable} from '@angular/core';
import {ChildrenDao} from '../../interface/сhildren/ChildrenDao';
import {ChildrenResponse} from '../../../model/children/Children';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ChildrenService implements ChildrenDao{
  constructor(private http: HttpClient) {
  }
  findAll(page: number): Observable<ChildrenResponse> {
    return this.http.get<ChildrenResponse>('/api/admin/child?page=' + page);
  }
}
