import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdvertisementService } from "src/app/core/http/advertismentApi.service";
import { siteSettingApi } from "src/app/core/http/site-setting.service";

@Component({
    selector:'app-adver',
    templateUrl:'./admin-advertisement.html'
})
export class AdminAdvertisementComponent{
    constructor(private http:HttpClient,private readonly router:Router,private readonly advertisementService:AdvertisementService,private readonly siteApi:siteSettingApi){}
theme:any;
themeId!: number;
ngOnInit(){

this.siteApi.getSiteSetting().subscribe((data:any)=>{
    const currentThemeSettings=data.find((setting:any)=>setting.settingName  === 'currentTheme');
    if (currentThemeSettings) {
      
        this.themeId = +currentThemeSettings.settingValue;

      
        console.log('Theme ID:', this.themeId);

        
        this.fetchTheme(this.themeId);
      } else {
        console.log('Setting "currentTheme" not found.');
      }

})



}
public openAd() {



  if (this.themeId === 1) {
    this.router.navigate(['/homeAdv']);
  } else if (this.themeId === 2) {
    this.router.navigate(['/theme2home']);
  }
}

public fetchTheme(themeId:number){

this.advertisementService.fetchThemeById(themeId).subscribe((themeDat:any)=>
this.theme= themeDat
)


}
}