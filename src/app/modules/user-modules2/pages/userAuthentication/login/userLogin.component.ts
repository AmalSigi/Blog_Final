import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { authenticationApi } from 'src/app/core/http/authentication.service';
import { PublicService } from 'src/app/core/http/public.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
})
export class UserLoginComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() onSignup = new EventEmitter();
  public captcha!: string;
  public email!: string;
  public aFormGroup!: FormGroup;
  public toAccessLogin:boolean=false;

  constructor(
    private authenticationApi: authenticationApi,
    private readonly subject: trackDataService,
    private formBuilder: FormBuilder
  
  ) {

  }
public siteKey:string='6Lcaev4nAAAAALrz-eoKLCM3WXymccEsaXSdF_go'

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }

  public resolved(event: any) {

    this.toAccessLogin=true;

    // Handle the reCAPTCHA challenge resolution here
    // You can access event information if needed
    console.log('reCAPTCHA resolved:', event);
  }

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public login() {
    if (this.loginForm.valid) {
      const body = this.loginForm.value;

      this.authenticationApi.login(body).subscribe({
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

  public handleReset() {}
  public handleExpire() {}
  public handleLoad() {}
  public handleSuccess($event: any) {}
}
