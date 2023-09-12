import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-admin-blog-setting',
  templateUrl: './admin-blog-setting.component.html',
})
export class AdminBlogSettingComponent implements OnInit {
  public fileToUpload: any;
  public editBlog: boolean = true;

  constructor(
    private readonly siteSettingApi: siteSettingApi,
    private readonly toster: ToastrService
  ) {}
  // name
  public blogNameForm: FormGroup = new FormGroup({
    id: new FormControl(1, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });
  // logo
  public logoForm: FormGroup = new FormGroup({
    id: new FormControl(2, Validators.required),
    settingValue: new FormControl('', Validators.required),
  });
  // comment
  public commentActiveForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    settingValue: new FormControl('', Validators.required),
  });
  // Pop up
  public popUpActiveForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),

    settingValue: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getSetting();
  }

  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      let blogName = respo.find((item: any) => item.id == 1);
      let popUp = respo.find((item: any) => item.id == 9);
      let commentStatus = respo.find((item: any) => item.id == 4);
      if (blogName) {
        this.blogNameForm.patchValue({
          id: blogName.id,
          settingValue: blogName.settingValue,
        });
      }
      if (popUp) {
        this.popUpActiveForm.patchValue({
          id: popUp.id,

          settingValue: JSON.parse(popUp.settingValue),
        });
      }
      if (commentStatus) {
        this.commentActiveForm.patchValue({
          id: commentStatus.id,
          settingValue: JSON.parse(commentStatus.settingValue),
        });
      }

      this.blogNameForm.patchValue;
    });
  }
  public addBlogName() {
    let settiingArray: any = [];
    settiingArray.push(this.blogNameForm.value);
    this.siteSettingApi
      .patchSiteSetting(settiingArray)
      .subscribe((respo: any) => {
        this.toster.success(
          `Site Name Is Changed to ${this.blogNameForm.controls['settingValue'].value}`
        );
      });
  }

  public onCheckboxChange(event: any) {
    let settiingArray: any = [];
    this.commentActiveForm.patchValue({
      settingValue: event.target.checked,
    });
    settiingArray.push(this.commentActiveForm.value);
    settiingArray[0].settingValue = JSON.stringify(
      settiingArray[0].settingValue
    );

    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        if (event.target.checked) {
          this.toster.success(`whole comments of the site is On`);
        } else {
          this.toster.success(`whole comments of the site is Off`);
        }
      },
      error: () => {},
    });
  }

  public fileImport(event: any) {
    this.fileToUpload = event.target.files[0];
    // this.picUpload = false;
    const pic = new FileReader();
    pic.readAsDataURL(this.fileToUpload);
    pic.onload = () => {
      // this.selectedPic = pic.result;
    };
  }

  public addLogo() {
    const formData = new FormData();
    if (this.fileToUpload) {
      formData.append('logo', this.fileToUpload, this.fileToUpload.name);
      this.siteSettingApi.patchLogo(formData).subscribe({
        next: () => {
          this.toster.success(`New log is added`);
        },
        error: () => {
          this.toster.error(`Error im adding new log `);
        },
      });
    }
  }
  public onCheckboxChangePopUp(event: any) {
    let settiingArray: any = [];

    this.popUpActiveForm.patchValue({
      settingValue: event.target.checked,
    });

    settiingArray.push(this.popUpActiveForm.value);

    settiingArray[0].settingValue = JSON.stringify(
      settiingArray[0].settingValue
    );

    this.siteSettingApi.patchSiteSetting(settiingArray).subscribe({
      next: () => {
        if (event.target.checked) {
          this.toster.success(`Pop-Up of the site is On`);
        } else {
          this.toster.success(`Pop-Up of the site is Off`);
        }
      },

      error: () => {},
    });
  }
}
