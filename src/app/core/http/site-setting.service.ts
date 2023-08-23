import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class siteSettingApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = 'http://192.168.29.97:5296/SiteSetting';

  public getSiteSetting() {
    return this.http.get(`${this.url}`);
  }
  public patchSiteSetting(setting: any) {
    return this.http.patch(`${this.url}`, setting);
  }
  public patchLogo(img: FormData) {
    console.log(img.get.length);
    return this.http.patch(`${this.url}/updateSiteLogo`, img);
  }
}
