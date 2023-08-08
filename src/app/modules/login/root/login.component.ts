import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private readonly http: HttpClient) {}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),
  });

  public login() {
    const url = 'http://192.168.29.97:5296/Authentication/login';

    if (this.loginForm.valid) {
      const body = this.loginForm.value;

      console.log(this.loginForm.value);

      this.http.post(url, body).subscribe((res: any) => {
        if (res) {
          localStorage.setItem(
            'jwtToken',

            JSON.stringify(res.jwtToken)
          );

          console.log(res.jwtToken);
        } else {
          alert('Invalid Credentials');
        }
      });
    }
  }

  public get controls() {
    return this.loginForm.controls;
  }
}
