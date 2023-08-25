import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { themeApi } from 'src/app/core/http/themes.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  constructor(private themeApi:themeApi,
    private readonly siteSettings:siteSettingApi,
    private readonly route:Router) {}
  public userLogin: boolean = false;
  public userSignup: boolean = false;
  ngOnInit() {
  }
  
}
