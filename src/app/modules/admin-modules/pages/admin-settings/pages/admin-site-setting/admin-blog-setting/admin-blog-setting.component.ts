import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';

@Component({
  selector: 'app-admin-blog-setting',
  templateUrl: './admin-blog-setting.component.html',
})
export class AdminBlogSettingComponent implements OnInit {
  public fileToUpload: any;

  constructor(private readonly siteSettingApi: siteSettingApi) {}
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
  ngOnInit(): void {
    this.getSetting();
  }

  public getSetting() {
    this.siteSettingApi.getSiteSetting().subscribe((respo: any) => {
      let blogName = respo.find((item: any) => item.id == 1);

      let commentStatus = respo.find((item: any) => item.id == 4);
      if (blogName) {
        this.blogNameForm.patchValue({
          id: blogName.id,
          settingValue: blogName.settingValue,
        });
      }
      if (commentStatus) {
        this.commentActiveForm.patchValue({
          id: commentStatus.id,
          settingValue: commentStatus.settingValue,
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
      .subscribe((respo: any) => {});
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

    this.siteSettingApi
      .patchSiteSetting(settiingArray)
      .subscribe((respo: any) => {});
  }

  public fileImport(event: any) {
    console.log('hi');
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
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
      this.siteSettingApi.patchLogo(formData).subscribe((repo: any) => {});
    }
  }
}
