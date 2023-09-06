import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { siteSettingApi } from './site-setting.service';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class themeApi {
  constructor(
    private readonly http: HttpClient,
    private readonly siteSettings: siteSettingApi
  ) {
    this.getSettings();
  }
  public url: string = `${environment.url}/Theme`;
  public getThemes(): Observable<any> {
    return this.http.get(this.url);
  }
  public getThemeById(Id: number): Observable<any> {
    return this.http.get(`${this.url}/${Id}`);
  }
  public updateTheme(Id: number, body: any): Observable<any> {
    return this.http.patch(`${this.url}/${Id}/update`, body);
  }

  public getSettings() {
    this.siteSettings.getSiteSetting().subscribe({
      next: (res) => {
        const theme: any = res;
        const currentTheme = theme.find(
          (setting: any) => setting.settingName == 'currentTheme'
        );
        const themeId = JSON.parse(currentTheme.settingValue);
        this.getCurrentTheme(themeId);
      },
    });
  }
  getCurrentTheme(themeId: number) {
    this.getThemeById(themeId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.name == 'Theme1') {
          return true;
        } else {
          return false;
        }
        // this.route.navigate([`${res.name}/`]);
      },
    });
  }

  // ad

  // get
  public getThemeAd(themeId: number) {
    this.http.get(`${this.url}/${themeId}`);
  }
  public getDynamicAdvertisementList(themeId: number) {
    this.http.get(`${this.url}/dynamicAdvertisementList`);
  }

  // post
}
