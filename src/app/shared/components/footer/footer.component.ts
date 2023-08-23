import { Component, OnInit } from '@angular/core';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public siteName: any;
  constructor(private readonly siteSettingApi: siteSettingApi) {}
  ngOnInit(): void {
    this.getSetting();
  }
  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      let blogName = respo.find((item: any) => item.id == 1);
      if (blogName) {
        this.siteName = blogName.settingValue;
      }
    });
  }
}
