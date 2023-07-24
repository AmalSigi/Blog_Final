import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent {
  public fileToUpload!: File;
  public selectedPic!: any;
  public editOn: boolean = false;
  public picShowDiv: boolean = false;
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
  }
  public unshowUpolodtemp(): void {
    this.picShowDiv = false;
  }
  public fileImport(event: any) {
    this.fileToUpload = event.target.files[0];
    this.picShowDiv = false;
    const pic = new FileReader();
    pic.readAsDataURL(this.fileToUpload);
    pic.onload = () => {
      this.selectedPic = pic.result;
    };
  }
}
