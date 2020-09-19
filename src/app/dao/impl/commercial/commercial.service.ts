import {Injectable} from '@angular/core';
import {CommercialDao} from "../../interface/commercial/CommercialDao";
import {Observable} from "rxjs";
import {BannerResponse} from "../../../model/commercial/BannerResponse";
import {environment} from "../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommercialService implements CommercialDao{

  url = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getOne(): Observable<BannerResponse> {
    return this.http.get<BannerResponse>('/api/banner/get');
  }

  updateBanner(bannerImage: any[], link: string, description: string, isOn: boolean): Observable<BannerResponse> {
    const formData = new FormData();
    bannerImage.forEach(item => {
      formData.append('bannerImage', item);
    });
    if (link) {
      formData.append('link', link);
    }
    if (description) {
      formData.append('description', description);
    }
    formData.append('isOn', isOn+ '');
    return this.http.post<BannerResponse>('/api/admin/banner', formData);

  }
}
