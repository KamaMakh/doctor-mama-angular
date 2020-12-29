import {Injectable} from '@angular/core';
import {ContractDAO} from '../../interface/contract/ContractDAO';
import {Contract, ContractResponse} from '../../../model/contract/Contract';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContractService implements ContractDAO{
  constructor(private http: HttpClient) {}

  changeStatus(id: number, status: string): Observable<Contract> {
    return this.http.put<Contract>(`/api/consultant/contract/${id}?status=${status}`, {status});
  }

  findAll(page: number): Observable<ContractResponse> {
    return this.http.get<ContractResponse>(`/api/consultant/contract?page=${page}`);
  }

  getOne(id: number): Observable<Contract> {
    return this.http.get<Contract>(`/api/consultant/contract/${id}`);
  }
}
