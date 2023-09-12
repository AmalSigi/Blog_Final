import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { themeApi } from 'src/app/core/http/themes.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  constructor(
    private themeApi: themeApi,
    private readonly siteSettings: siteSettingApi,
    private router: Router, private route: ActivatedRoute
  ) {}
  public userLogin: boolean = false;
  public userSignup: boolean = false;
  ngOnInit() {
    // const theme = this.route.snapshot.data['theme'] as string;
    // console.log(theme)
    //     // Now, you can navigate to the appropriate theme route
    //     this.router.navigate(['theme', theme]);
      }
  }

