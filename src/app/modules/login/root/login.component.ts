import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authentication: authenticationApi,
    private readonly route: Router,
    private readonly userApi: userApi
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
          localStorage.setItem(
            'jwtToken',

            JSON.stringify(response.jwtToken)
          );
          // alert('Login successfully..');
this.userApi.currentUserDetails().subscribe({
  next: (response) => {
    console.log(response)
    const userRole=response.userRoles
    console.log(userRole[0].role.roleName)

    if(userRole[0].role.roleName=='Author'){
this.route.navigate(['/author']);
    }
    else{
this.route.navigate(['/admin']);

    }

}});

        
        },
        error: (error) => {
          alert('Error: ' + JSON.stringify(error.error));
        },
      });
    }
  }

  public get controls() {
    return this.loginForm.controls;
  }
}
