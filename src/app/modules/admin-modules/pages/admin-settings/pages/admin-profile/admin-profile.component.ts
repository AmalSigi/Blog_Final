import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userApi } from 'src/app/core/http/userAccount.services';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
})
export class AdminProfileComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: userApi,
    private readonly router: ActivatedRoute
  ) {}

  public fileToUpload!: File;
  public profileDetailes: any;
  public selectedPic!: any;
  public editOn: boolean = false;
  public picShowDiv: boolean = false;
  public picUpload: boolean = false;
  public editForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  });

  public editedForm = new FormGroup({
    _FirstName: new FormControl('', Validators.required),
    _MiddleName: new FormControl('', Validators.required),
    _LastName: new FormControl('', Validators.required),
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

    // this.http
    //   .get('http://192.168.29.97:5296/UserAccount/4')
    //   .subscribe((repo) => {
    //
  }
  public populateForm(data: any): void {
    this.editForm.patchValue({
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      email: data.email,
    });
    this.profileDetailes = data;

    this.profileDetailes.profilePicturePath =
      'http://192.168.29.97:5296/assets/' + data?.profilePicturePath;
  }

  public edit() {
    this.editOn = !this.editOn;
  }

  public update() {
    this.editOn = !this.editOn;
    console.log(this.editForm);
    this.updateUserDetails();
    this.updateUserPassword();
  }

  public updateUserDetails() {
    this.editedForm.patchValue({
      _FirstName: this.editForm.controls['first_name'].value,
      _LastName: this.editForm.controls['last_name'].value,
      _MiddleName: this.editForm.controls['first_name'].value,
    });
    this.userService
      .updateUserDetails(this.profileDetailes.id, this.editedForm.value)
      .subscribe({
        next: (result) => {
          alert('updated successfully');
        },
        error: (err) => {
          alert('error');
        },
      });
  }
  public updateUserPassword() {
    this.passwordForm.patchValue({
      currentPassword: this.editForm.controls['password'].value,
      newPassword: this.editForm.controls['new_password'].value,
    });

    // this.http
    //   .patch(
    //     'http://192.168.29.97:5296/UserAccount/4/Updatepassword',
    //     this.passwordForm.value
    //   )
    //   .subscribe((respo) => {});
    this.userService.updatePassword(this.passwordForm.value).subscribe({
      next: (res) => {
        console.log('success', res);
      },
      error: (err) => {
        alert('Error');
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

  public confirmingPassword(event: any) {
    console.log(event);
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
            if (response) {
              alert('Profile updated');
            }
          },
          error: (response) => {
            alert('Error updating profile picture:');
          },
        });
    }
  }
}
