import {Observable} from 'rxjs';
import {ConsultantRequest, ConsultantResponse, ConsultantsResponse} from '../../../model/consultant/ConsultantResponse';

export interface ConsultantDao {
  findAll(page: number): Observable<ConsultantsResponse>;
  create(data: ConsultantRequest): Observable<ConsultantResponse>;
  getOne(id: number): Observable<ConsultantResponse>;
  delete(id: number): Observable<ConsultantResponse>;
}
