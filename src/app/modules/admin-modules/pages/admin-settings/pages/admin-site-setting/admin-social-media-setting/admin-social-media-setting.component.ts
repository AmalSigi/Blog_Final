import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-admin-social-media-setting',
  templateUrl: './admin-social-media-setting.component.html',
})
export class AdminSocialMediaSettingComponent {
  public fileToUpload: any;
  public editmail: boolean = true;
  public editfacebook: boolean = true;
  public edityoutube: boolean = true;
  public editinstagram: boolean = true;

  constructor(
    private readonly siteSettingApi: siteSettingApi,
    private readonly toster: ToastrService
  ) {}
  // gmail
  public mailForm: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });
  // facebook
  public facebookForm: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });
  // youtube
  public youtubeForm: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });

  // instagram
  public instagramForm: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getSetting();
  }

  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      let facebook = respo.find((item: any) => item.id == 5);
      let instagram = respo.find((item: any) => item.id == 6);
      let youtube = respo.find((item: any) => item.id == 7);
      let mail = respo.find((item: any) => item.id == 8);

      let commentStatus = respo.find((item: any) => item.id == 4);
      if (facebook) {
        this.facebookForm.patchValue({
          id: facebook.id,
          settingValue: facebook.settingValue,
        });
      }
      if (instagram) {
        this.instagramForm.patchValue({
          id: instagram.id,
          settingValue: instagram.settingValue,
        });
      }
      if (youtube) {
        this.youtubeForm.patchValue({
          id: youtube.id,
          settingValue: youtube.settingValue,
        });
      }
      if (mail) {
        this.mailForm.patchValue({
          id: mail.id,
          settingValue: mail.settingValue,
        });
      }
    });
  }

  // mail

  public addMail() {
    let settiingArray: any = [];
    settiingArray.push(this.mailForm.value);
    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        this.toster.success(`Mail address is Updated`);
        if (!this.editmail) {
          this.editmail = !this.editmail;
        }
      },
      error: (respo) => {
        this.toster.error(respo.error);
      },
    });

    (respo: any) => {};
  }
  // facebook
  public addFacebook() {
    let settiingArray: any = [];
    settiingArray.push(this.facebookForm.value);
    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        this.toster.success('Facebook Account is Upated');
        if (!this.editfacebook) {
          this.editfacebook = !this.editfacebook;
        }
      },
      error: () => {
        this.toster.error('Error in updating Facebook Account ');
      },
    });
  }
  // instagram

  public addInstagram() {
    let settiingArray: any = [];
    settiingArray.push(this.instagramForm.value);
    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        this.toster.success('Instagram Account Is Updated');
        if (!this.editinstagram) {
          this.editinstagram = !this.editinstagram;
        }
      },
      error: () => {
        this.toster.error('Error in updating Instagram Account ');
      },
    });
  }
  // youtube
  public addYoutube() {
    let settiingArray: any = [];
    settiingArray.push(this.youtubeForm.value);
    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        this.toster.success('Youte Channel Is Updated');
        if (!this.edityoutube) {
          this.edityoutube = !this.edityoutube;
        }
      },
      error: () => {
        this.toster.error('Error in updating Youtube Channel ');
      },
    });
  }
}
