import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { siteSettingApi } from '../http/site-setting.service';
import { themeApi } from '../http/themes.services';

@Injectable({
  providedIn: 'root',
})
export class ThemeResolver implements Resolve<string> {
  constructor(private themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
    private readonly route: Router) {}
    public currentTheme!: string;
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
this.currentTheme=res.name
        // this.route.navigate([`${res.name}/`]);
      },
    });
  }
  resolve(route: ActivatedRouteSnapshot): string {
    // Replace this condition with your actual logic to determine the active theme
    const condition = /* Your condition here */ true;

    if (condition) {
      // Activate Theme 1
      return 'theme1';
    } else {
      // Activate Theme 2
      return 'theme2';
    }
  }
}
