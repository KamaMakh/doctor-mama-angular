import {Injectable} from '@angular/core';
import {ConsultantDao} from '../../interface/consultant/СonsultantDao';
import {Observable} from 'rxjs';
import {ConsultantRequest, ConsultantResponse, ConsultantsResponse} from '../../../model/consultant/ConsultantResponse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConsultantService implements ConsultantDao{
  constructor(private http: HttpClient) {
  }

  delete(id: number): Observable<ConsultantResponse> {
    return this.http.post<ConsultantResponse>(`/api/admin/consultant/${id}`, id);
  }

  findAll(page: number, email?: string): Observable<ConsultantsResponse> {
    return this.http.get<ConsultantsResponse>('/api/admin/consultant?page=' + page);
  }

  getOne(id: number): Observable<ConsultantResponse> {
    return this.http.get<ConsultantResponse>(`/api/admin/consultant/${id}`);
  }

  create(data: ConsultantRequest): Observable<ConsultantResponse> {
    return this.http.post<ConsultantResponse>(`/api/admin/consultant/reg`, data);
  }
}
