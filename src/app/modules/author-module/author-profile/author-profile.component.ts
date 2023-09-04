import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { userApi } from 'src/app/core/http/userAccount.service';

 

@Component({

  selector: 'app-profile',

  templateUrl: './author-profile.component.html',

})

export class AuthorProfile {

  users: any;

  constructor(

    private readonly http: HttpClient,

    private readonly userService: userApi,

    private readonly router: ActivatedRoute

  ) {}

  public editing = false;

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

    about: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),

    new_password: new FormControl('', Validators.required),

    confirm_password: new FormControl('', Validators.required),

  });

 

  public editedForm = new FormGroup({

    firstName: new FormControl('', Validators.required),

    middleName: new FormControl('', Validators.required),

    lastName: new FormControl('', Validators.required),

    about: new FormControl('', Validators.required),

  });

  public passwordForm = new FormGroup({

    currentPassword: new FormControl('', Validators.required),

    newPassword: new FormControl('', Validators.required),

  });

 

  ngOnInit(): void {

    this.getProfile();

  }

 

  public getProfile() {

    this.userService.currentUserDetails().subscribe({

      next: (result) => {

        this.users = result;

        this.populateForm(this.users);

      },

    });

  }

  public populateForm(data: any): void {

    this.editForm.patchValue({

      first_name: data.firstName,

      middle_name: data.middleName,

      last_name: data.lastName,

      about: data.about,

      email: data.email,

    });

    this.profileDetailes = data;

 

    this.profileDetailes.profilePicturePath =

      'http://192.168.29.97:5296/assets/' + data?.profilePicturePath;

  }

 

  public edit() {

    this.editOn = !this.editOn;

    this.getProfile();

  }

 

  public update() {

    this.editOn = !this.editOn;

    console.log(this.editForm);

    this.updateUserDetails();

    //  this.updateUserPassword();

  }

 

  public updateUserDetails() {

    this.editedForm.patchValue({

      firstName: this.editForm.controls['first_name'].value,

      lastName: this.editForm.controls['last_name'].value,

      middleName: this.editForm.controls['middle_name'].value,

      about: this.editForm.controls['about'].value,

    });

    this.userService.updateOwnDetails(this.editedForm.value).subscribe({

      next: (result) => {

        console.log(result);

        this.getProfile();

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

 

      this.userService.updateOwnProfilePic(formData).subscribe({

        next: (response) => {

          this.picShowDiv = false;

          this.getProfile();

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

  public editingPass() {

    this.editing = true;

  }

  public cancel() {

    this.editing = false;

  }

}