import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { categoryApi } from 'src/app/core/http/category.service';
import { PublicService } from 'src/app/core/http/public.service';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  public showSubCat: boolean = false;
  public showCategory: boolean = false;
  public index!: number;
  public category: any;

  public userDetails: any;
  public showLogOut: boolean = false;
  public showUserDetails: boolean = false;
  public indexPosition!: number;
  public subIndexPosition!: number;

  public siteName: any;
  public siteLogo: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  constructor(
    private readonly reloadData: trackDataService,
    private readonly userApiService: userApi,
    private readonly publicapi: PublicService,

    private readonly siteSettingApi: siteSettingApi
  ) {}
  ngOnInit(): void {
    this.getCategory();
    this.getUserDetails();
    this.getSetting();
  }

  public reloadPage: Subscription = this.reloadData
    .getClickEvent1()
    .subscribe(() => {
      this.getUserDetails();
    });
  public getUserDetails() {
    this.userApiService.currentUserDetails().subscribe({
      next: (response) => {
        this.userDetails = response;
        this.showUserDetails = true;
      },
      error: () => {
        this.showUserDetails = false;
      },
    });
  }

  public getCategory() {
    this.publicapi.getCategory().subscribe((response: any) => {
      this.category = response;
    });
  }

  public showSubCategory(index: number) {
    this.index = index;
    this.showSubCat = !this.showSubCat;
  }
  public reload() {
    this.showCategory = false;
    this.showSubCat = false;
  }
  public moreCategory() {
    this.showCategory = !this.showCategory;
  }

  public getSetting() {
    this.publicapi.getSiteSetting().subscribe((respo: any) => {
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

  public login() {
    this.onChange.emit();
    this.getUserDetails();
  }

  public logOut() {
    if (confirm('Are you sure you want to log out ?')) {
      localStorage.removeItem('jwtToken');
      this.getUserDetails();
      this.showLogOut = false;
      this.reloadData.sendClickEvent1();
    }
  }
}
