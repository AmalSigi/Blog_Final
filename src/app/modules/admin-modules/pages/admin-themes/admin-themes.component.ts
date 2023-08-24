import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { postData } from 'src/app/core/services/posts.services';
import { themeApi } from 'src/app/core/http/themes.services';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-admin-themes',
  templateUrl: './admin-themes.component.html',
})
export class AdminThemesComponent implements OnInit {
  public themes: any;
  public currentTheme: any
  constructor(
    private readonly http: HttpClient,
    private readonly themeData: postData,
    private readonly themeApi:themeApi,
    private readonly siteSettings:siteSettingApi
    
  ) {}
  ngOnInit(): void {
    this.getThemes();
  }

  public getThemes() {

  this.siteSettings.getSiteSetting().subscribe({
    next:(res)=>{
      const theme:any =res
const currentTheme=theme.find((setting:any)=>setting.settingName=='currentTheme')
const themeId=JSON.parse(currentTheme.settingValue)
this.getCurrentTheme(themeId)
    
    }
  })
    this.themes = this.themeData.Themes;
  }
  getCurrentTheme(themeId:number){
    this.themeApi.getThemeById(themeId).subscribe({
      next:(res)=>{
this.currentTheme=res;
console.log(this.currentTheme)
      }
    })
  }
}
