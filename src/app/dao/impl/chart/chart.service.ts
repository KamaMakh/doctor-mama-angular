import {ChartDao} from '../../interface/chart/ChartDao';
import {SleepDurationRequest, SleepDurationResponse, SleepDurationResponseTotal} from '../../../model/charts/SleepDuration';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService implements ChartDao{
  constructor(private http: HttpClient) {
  }
  getSleepDuration(data: SleepDurationRequest): Observable<SleepDurationResponse> {
    let queryParams = `childId=${data.childId}&startDay=${data.startDay}&startMonth=${data.startMonth}&startYear=${data.startYear}`;
    for (const key in data) {
      if (data[key]) {
        queryParams += `&${key}=${data[key]}`;
      }
    }
    return this.http.get<SleepDurationResponse>(`/api/admin/activity/sleeping/duration?${queryParams}`);
  }
  getSleepDurationTotal(data: SleepDurationRequest): Observable<SleepDurationResponseTotal> {
    let queryParams = `childId=${data.childId}&startDay=${data.startDay}&startMonth=${data.startMonth}&startYear=${data.startYear}`;
    for (const key in data) {
      if (data[key]) {
        queryParams += `&${key}=${data[key]}`;
      }
    }
    return this.http.get<SleepDurationResponseTotal>(`/api/admin/activity/sleeping/duration/full?${queryParams}`);
  }
}
