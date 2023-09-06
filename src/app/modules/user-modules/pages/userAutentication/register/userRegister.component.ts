import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/core/http/public.service';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
})
export class UserRegisterComponent {
  @Output() close = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private readonly publicapi: PublicService) {}

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  public diffpsw: boolean = false;

  public registrationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  public togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    const formControl = this.registrationForm.get(field);
    if (formControl) {
      formControl.setValue(formControl.value);
    }
  }

  public closeModel() {
    this.close.emit();
  }

  public onSubmit(): void {
    if (
      this.registrationForm.controls['password'].value !=
      this.registrationForm.controls['confirmPassword'].value
    ) {
      this.diffpsw = true;
      alert('Singup Successfully');
      console.log('error');
      return;
    }
    this.publicapi.postUserSignUp(this.registrationForm.value).subscribe({
      next: () => {
        this.registrationForm.reset();
        this.close.emit();
        this.onChange.emit();
        alert('Singup Successfully');
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }
}
