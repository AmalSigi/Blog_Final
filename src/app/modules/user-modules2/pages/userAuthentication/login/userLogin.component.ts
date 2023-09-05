import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
})
export class UserLoginComponent {
  @Output() close = new EventEmitter();
  @Output() onSignup = new EventEmitter();
  constructor(
    private authentication: authenticationApi,
    private readonly subject: trackDataService
  ) {}
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public login() {
    if (this.loginForm.valid) {
      const body = this.loginForm.value;

      this.authentication.login(body).subscribe({
        next: (response) => {
          localStorage.setItem('jwtToken', JSON.stringify(response.jwtToken));
          this.subject.sendClickEvent1();
          this.close.emit();
        },
        error: (error) => {
          alert('Error: ' + JSON.stringify(error.error));
        },
      });
    }
  }

  public closeModal() {
    this.close.emit();
  }

  public signUp() {
    this.onSignup.emit();
  }
}
