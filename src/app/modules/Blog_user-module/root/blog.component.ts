import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { themeApi } from 'src/app/core/http/themes.services';

@Component({
  selector: 'app-blog',
  template: '',
})
export class BlogComponent {
  constructor(
    private themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
    private readonly route: Router
  ) {}
  public userLogin: boolean = false;
  public userSignup: boolean = false;
  ngOnInit() {
    this.getThemes();
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
        this.route.navigate([`${res.name}/`]);
      },
    });
  }
}
