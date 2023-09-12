import { Component } from '@angular/core';
import { themeApi } from './core/http/themes.services';
import { siteSettingApi } from './core/http/site-setting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

 


