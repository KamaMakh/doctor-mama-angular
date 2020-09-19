import {Observable} from 'rxjs';
import {SleepDurationRequest, SleepDurationResponse} from '../../../model/charts/SleepDuration';

export interface ChartDao {
  getSleepDuration(data: SleepDurationRequest): Observable<SleepDurationResponse>;
}
