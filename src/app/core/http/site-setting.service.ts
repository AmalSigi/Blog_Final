import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class siteSettingApi {
  constructor(private readonly http: HttpClient) {}
  public url: string = `${environment.url}/SiteSetting`;

  public getSiteSetting(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
  public patchSiteSetting(setting: any): Observable<any> {
    return this.http.patch(`${this.url}`, setting);
  }
  public patchLogo(img: FormData): Observable<any> {
    return this.http.patch(`${this.url}/updateSiteLogo`, img);
  }
  public updateCurrentTheme(body: any): Observable<any> {
    return this.http.patch(`${this.url}/updateCurrentTheme`, body);
  }
}
