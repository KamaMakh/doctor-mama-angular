import {Observable} from 'rxjs';
import {Contract, ContractResponse} from '../../../model/contract/Contract';

export interface ContractDAO {
  findAll(page: number): Observable<ContractResponse>;
  getOne(id: number): Observable<Contract>;
  changeStatus(id: number, status: string): Observable<Contract>;
}
