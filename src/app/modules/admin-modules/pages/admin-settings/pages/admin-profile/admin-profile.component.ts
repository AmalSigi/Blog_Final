import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userApi } from 'src/app/core/http/userAccount.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent implements OnInit {
  constructor(
    private readonly userService: userApi,
    private readonly router: ActivatedRoute,
    private readonly toster: ToastrService
  ) {}

  public fileToUpload!: File;
  public profileDetailes: any;
  public selectedPic!: any;
  public editOn: boolean = false;
  public picShowDiv: boolean = false;
  public picUpload: boolean = false;
  public editPassword: boolean = false;
  public mediaFilePath: string = `${environment.url}/assets/`;
  public editForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    aboutUser: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  });

  public editedForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    aboutUser: new FormControl('', Validators.required),
  });
  public passwordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile() {
    this.router.queryParams.subscribe((params) => {
      if (params['id']) {
        const id = params['id'];
        this.userService.getUserAccount(id).subscribe({
          next: (result) => {
            this.populateForm(result);
          },
        });
      } else {
        this.userService.currentUserDetails().subscribe({
          next: (result) => {
            this.populateForm(result);
          },
        });
      }
    });
  }
  public populateForm(data: any): void {
    this.editForm.patchValue({
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      email: data.email,
      aboutUser: data.aboutUser,
    });
    this.profileDetailes = data;

    this.profileDetailes.profilePicturePath = data?.profilePicturePath;
  }

  public edit() {
    this.editOn = !this.editOn;
    this.getProfile();
  }

  public update() {
    this.editOn = !this.editOn;
    this.updateUserDetails();
  }

  public updateUserDetails() {
    this.editedForm.patchValue({
      firstName: this.editForm.controls['first_name'].value,
      lastName: this.editForm.controls['last_name'].value,
      middleName: this.editForm.controls['middle_name'].value,
      aboutUser: this.editForm.controls['aboutUser'].value,
    });
    this.userService
      .updateUserDetails(this.profileDetailes.id, this.editedForm.value)
      .subscribe({
        next: (result) => {
          this.toster.success(`Update Profile successfully`);
          this.getProfile();
        },
        error: (err) => {
          this.toster.error(`Error in updating`);
        },
      });
  }
  public updatePassword() {
    this.passwordForm.patchValue({
      currentPassword: this.editForm.controls['password'].value,
      newPassword: this.editForm.controls['new_password'].value,
    });

    this.userService.updatePassword(this.passwordForm.value).subscribe({
      next: (res) => {
        this.toster.success(`Passsword is Update`);

        this.editPassword = !this.editPassword;
        this.getProfile();
      },
      error: (err) => {
        this.toster.error(`Error is updating password`);
      },
    });
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

  public updateProfilePicture() {
    if (this.fileToUpload) {
      const formData = new FormData();

      formData.append('picture', this.fileToUpload, this.fileToUpload.name);

      this.userService
        .updateUserProfilePic(this.profileDetailes.id, formData)
        .subscribe({
          next: (response) => {
            this.unshowUpolodtemp();
            this.getProfile();
            this.toster.success(`Profile Picture Is added`);
            window.location.reload();
          },
          error: (response) => {
            this.toster.error('Error updating profile picture:');
          },
        });
    }
  }
}
