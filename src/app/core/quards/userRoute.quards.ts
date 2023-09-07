import { Injectable } from "@angular/core";
import { authenticationApi } from "../http/authentication.service";
import { HttpClient } from '@angular/common/http';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { siteSettingApi } from "../http/site-setting.service";
import { themeApi } from "../http/themes.services";

@Injectable({
  providedIn: 'root',
})

export class loginQuards {
    public themeName!: string;
  constructor(
    private readonly http: HttpClient,
    private readonly route: Router,
    private themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
  ) {}
  public url: string = `${environment.url}/Authentication/isAuthorized`;
  canActivate(): any {
  let currentTheme=this.getThemes()
  }
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
      this.themeName=res.name;
      },
    });
    return this.themeName;
  }
}
