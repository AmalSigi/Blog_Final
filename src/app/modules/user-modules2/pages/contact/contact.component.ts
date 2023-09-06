import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class UserContactComponent {
  public siteKey: string = '6Lcaev4nAAAAALrz-eoKLCM3WXymccEsaXSdF_go';
  public aFormGroup!: FormGroup;
  public toAccessLogin:boolean=false;
  constructor(private readonly http: HttpClient, private formBuilder: FormBuilder) {
    this.sendMessageForm = this.formBuilder.group({
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
    this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required],
      });
    
    }
    public resolved(event: any) {
  
      this.toAccessLogin=true;
    }




  countries: any[] = [];
  selectedCountry: any;
  phoneNumber: string = '';
  sendMessageForm!: FormGroup;

  public fetchCountryData() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe(
      (data: any) => {
        // console.log(data)
        this.countries = data;
      },
      (error) => {
        //console.error("Error fetching country data:", error);
      }
    );
  }
  public sendMessage() {
    if (this.sendMessageForm.valid) {
      const apiUrl = 'http://192.168.29.97:5296/ContactUs/newMessage';
      const requestBody = this.sendMessageForm.value;
      console.log(requestBody);

      this.http.post(apiUrl, requestBody).subscribe(
        (response) => {
          console.log(response);
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
      console.log(this.phoneNumber);
    } else {
    }
  }
}
