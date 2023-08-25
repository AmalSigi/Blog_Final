import { Injectable } from "@angular/core";
import { siteSettingApi } from "../http/site-setting.service";

@Injectable({
    providedIn: 'root',
})
export class selectTheme{
    constructor(private readonly siteSetting:siteSettingApi){}
public themeId!:number;
    public getCurrentTheme():number{
        this.siteSetting.getSiteSetting().subscribe({
            next: (res) => {
              const theme: any = res;
              console.log(theme)
              const currentTheme = theme.find(
                (setting: any) => setting.settingName == 'currentTheme'
              );
              this.themeId = JSON.parse(currentTheme.settingValue);
              console.log(this.themeId)
            },
          });
          return this.themeId;

    }
}