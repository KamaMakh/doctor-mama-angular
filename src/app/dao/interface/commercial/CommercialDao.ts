import {Observable} from "rxjs";
import {BannerResponse} from "../../../model/commercial/BannerResponse";

export interface CommercialDao {
  getOne(): Observable<BannerResponse>;
  updateBanner(bannerImage: any[], link: string, description: string, isOn: boolean): Observable<BannerResponse>;
}
