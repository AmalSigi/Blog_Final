import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdvertisementService } from 'src/app/core/http/advertismentApi.service';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-adver',
  templateUrl: './admin-advertisement.html',
})
export class AdminAdvertisementComponent {
  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly advertisementService: AdvertisementService,
    private readonly siteApi: siteSettingApi
  ) {}
  theme: any;
  themeId!: number;
  public mediaFilePath: string = `${environment.url}/assets/`;
  ngOnInit() {
    this.siteApi.getSiteSetting().subscribe((data: any) => {
      const currentThemeSettings = data.find(
        (setting: any) => setting.settingName === 'currentTheme'
      );
      if (currentThemeSettings) {
        this.themeId = +currentThemeSettings.settingValue;

        this.fetchTheme(this.themeId);
      } else {
      }
    });
  }
  public openAd() {
    if (this.themeId === 1) {
      this.router.navigate(['/homeAdv']);
    } else if (this.themeId === 2) {
      this.router.navigate(['/theme2home']);
    }
  }

  public fetchTheme(themeId: number) {
    this.advertisementService
      .fetchThemeById(themeId)
      .subscribe((themeDat: any) => (this.theme = themeDat));
  }
}
