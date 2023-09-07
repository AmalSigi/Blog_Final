import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from 'src/app/core/http/public.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class UserContactComponent {
  public siteKey: string = '6Lcaev4nAAAAALrz-eoKLCM3WXymccEsaXSdF_go';
  public aFormGroup!: FormGroup;
  public toAccessLogin: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private fb: FormBuilder,
    private readonly publicapi: PublicService
  ) {
    this.sendMessageForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      country: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchCountryData();
    this.aFormGroup = this.fb.group({
      recaptcha: ['', Validators.required],
    });
  }
  public resolved(event: any) {
    this.toAccessLogin = true;
  }

  countries: any[] = [];
  selectedCountry: any;
  phoneNumber: string = '';
  sendMessageForm!: FormGroup;

  public fetchCountryData() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe(
      (data: any) => {
        this.countries = data;
      },
      (error) => {}
    );
  }
  public sendMessage() {
    if (this.sendMessageForm.valid) {
      const requestBody = this.sendMessageForm.value;

      this.publicapi.postContactUs(requestBody).subscribe(
        (response) => {
          alert('Message sent successfully:');
        },
        (error) => {
          alert('Error sending message:');
        }
      );
    }
  }

  public onCountrySelect(event: any): void {
    const selectedIndex = event.target.selectedIndex;
    this.selectedCountry = this.countries[selectedIndex];

    if (this.selectedCountry) {
      this.phoneNumber =
        this.selectedCountry.idd.root + this.selectedCountry.idd.suffixes[0];
    } else {
    }
  }
}
