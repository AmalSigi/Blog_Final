import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { authenticationApi } from "src/app/core/http/authentication.service";

@Component({
    selector:'app-userLogin',
    templateUrl: './userLogin.component.html'
})
export class UserLoginComponent{
   constructor(private authentication:authenticationApi){}
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

            this.close.emit();
          
        },
        error: (error) => {
          alert('Error: ' + JSON.stringify(error.error));
        },
      });
    }
  }
   @Output() close = new EventEmitter();
   public closeModal(){
    this.close.emit();
   }
}