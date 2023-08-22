import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { toastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authentication: authenticationApi,
    private readonly route: Router,
    private readonly toastr: toastrService
  ) {}
  ngOnInit(): void {}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),

    password: new FormControl('', Validators.required),
  });

  public login() {
    if (this.loginForm.valid) {
      const body = this.loginForm.value;

      this.authentication.login(body).subscribe({
        next: (response) => {
          if (response) {
            localStorage.setItem(
              'jwtToken',

              JSON.stringify(response.jwtToken)
            );
            this.toastr.showSuccess('login successfully..');
            this.route.navigate(['']);
          }
        },
        error: (error) => {
          this.toastr.showError(error.error);
        },
      });
    }
  }

  public get controls() {
    return this.loginForm.controls;
  }
}
