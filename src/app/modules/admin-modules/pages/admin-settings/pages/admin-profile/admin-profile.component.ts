import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent {
  constructor(private readonly http: HttpClient) {}
  public fileToUpload!: File;
  public selectedPic!: any;
  public editOn: boolean = false;
  public picShowDiv: boolean = false;
  public picUpload: boolean = false;
  public editForm = new FormGroup({
    first_name: new FormControl('Amal', Validators.required),
    last_name: new FormControl('Sigi', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('amal@gmail.com', Validators.required),
    birthday: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
  });

  public edit() {
    this.editOn = !this.editOn;
  }
  public showUpolodtemp() {
    this.picShowDiv = true;
    this.picUpload = true;
  }
  public unshowUpolodtemp(): void {
    this.picShowDiv = false;
  }
  public fileImport(event: any) {
    this.fileToUpload = event.target.files[0];
    this.picUpload = false;
    const pic = new FileReader();
    pic.readAsDataURL(this.fileToUpload);
    pic.onload = () => {
      this.selectedPic = pic.result;
    };
  }

  public uploadImg() {
    console.log(this.fileToUpload);
    // this.http
    //   .post('http://192.168.29.97:5296/Media', this.fileToUpload)
    //   .subscribe((respo) => {
    //     console.log(respo);
    //   });
  }
}
