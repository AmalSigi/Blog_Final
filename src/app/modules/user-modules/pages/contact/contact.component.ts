import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ContactUsService } from 'src/app/core/http/contact-us.service';
import { siteSettingApi } from 'src/app/core/http/site-setting.service';
import { Country } from 'src/app/core/services/countery.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  public countries: any;
  public facebook: any;
  public mail: any;
  public instagram: any;
  public youtube: any;
  public aFormGroup!: FormGroup;
  constructor(
    private readonly country: Country,
    private readonly contact: ContactUsService,
    private readonly siteSetting: siteSettingApi,
    private formBuilder: FormBuilder

  ) {}
public siteKey:string='6Lcaev4nAAAAALrz-eoKLCM3WXymccEsaXSdF_go'

  public toAccessLogin:boolean=false;
  public contactForm = new FormGroup({
    message: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNo: new FormControl(''),
    country: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.countries = this.country.country;
    this.getSitsetting();
   
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required],
      });
    
    }
    public resolved(event: any) {
  
      this.toAccessLogin=true;
    }
  

  public getSitsetting() {
    this.siteSetting.getSiteSetting().subscribe({
      next: (respo) => {
        console.log(respo);
        this.facebook = respo.find((item: any) => item.id == 5);

        this.instagram = respo.find((item: any) => item.id == 6);
        this.youtube = respo.find((item: any) => item.id == 7);
        this.mail = respo.find((item: any) => item.id == 8);
        console.log(this.mail);
      },
      error: () => {},
    });
  }

  public send() {
    if (this.contactForm.valid) {
      this.contact.postContactMessage(this.contactForm.value).subscribe({
        next: () => {
         
          this.contactForm.reset();
        },
        error: () => {},
      });
      
    } else {
      alert('Fill necessary Details');
    }
  }
}
