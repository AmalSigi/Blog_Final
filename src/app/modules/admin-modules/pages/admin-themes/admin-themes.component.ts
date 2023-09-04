import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postData } from 'src/app/core/services/posts.services';
import { themeApi } from 'src/app/core/http/themes.services';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-themes',
  templateUrl: './admin-themes.component.html',
})
export class AdminThemesComponent implements OnInit {
  public themes: any;
  public currentTheme: any;
  public openSample: boolean = false;
  public themeUrl!: any;
  public selectedTheme: any;
  constructor(
    private readonly http: HttpClient,
    private readonly themeData: postData,
    private readonly themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
    private readonly sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getThemes();
  }

  public getThemes() {
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
    this.themeApi.getThemes().subscribe({
      next: (res) => {
        this.themes = res;
      },
    });
  }
  getCurrentTheme(themeId: number) {
    this.themeApi.getThemeById(themeId).subscribe({
      next: (res) => {
        this.currentTheme = res;
        console.log(this.currentTheme);
      },
    });
  }
  public openSampleView(data: any): void {
    this.themeUrl = `http://localhost:4200/ ${this.sanitizer.bypassSecurityTrustUrl(
      data.name
    )}`;
    this.openSample = true;
    this.selectedTheme = data;

    console.log(this.themeUrl);
  }
  public closeSampleView() {
    this.getThemes();

    this.openSample = false;
  }
}
