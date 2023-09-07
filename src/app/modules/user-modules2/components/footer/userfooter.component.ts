import { Component } from '@angular/core';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'user-footer',
  templateUrl: './userfooter.component.html',
})
export class UserFooter {
  public facebook: any;
  public instagram: any;
  public youtube: any;
  constructor(private readonly siteSettingApi: siteSettingApi) {}
  ngOnInit(): void {
    this.getSetting();
  }
  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      this.facebook = respo.find((item: any) => item.id == 5);

      this.instagram = respo.find((item: any) => item.id == 6);
      this.youtube = respo.find((item: any) => item.id == 7);
    });
  }
}
