import { Component, OnInit } from '@angular/core';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public siteName: any;
  public siteLogo: any;
  constructor(private readonly siteSettingApi: siteSettingApi) {}
  ngOnInit(): void {
    this.getSetting();
  }
  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      let blogName = respo.find((item: any) => item.id == 1);
      let blogLogo = respo.find((item: any) => item.id == 2);
      if (blogName) {
        this.siteName = blogName.settingValue;
      }
      if (blogLogo) {
        this.siteLogo = blogLogo.settingValue;
      }
    });
  }
}
