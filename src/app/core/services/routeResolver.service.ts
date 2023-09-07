import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { siteSettingApi } from '../http/site-setting.service';
import { themeApi } from '../http/themes.services';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteResolver {
  constructor( private themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
    private readonly route: Router) {}

  public getThemes() {
    this.siteSettings.getSiteSettingForPublic().subscribe({
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
    this.themeApi.getThemeByIdForPublic(themeId).subscribe({
      next: (res) => {
        return res.name;
      },
    });
  }
}
