import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactUsService } from 'src/app/core/http/contact-us.service';
import { PublicService } from 'src/app/core/http/public.service';

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
  constructor(
    private readonly contact: ContactUsService,
    private readonly publicapi: PublicService,
    private readonly http: HttpClient
  ) {}
  public contactForm = new FormGroup({
    message: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNo: new FormControl(''),
    country: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.fetchCountryData();
    this.getSitsetting();
  }

  public fetchCountryData() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe(
      (data: any) => {
        this.countries = data;
      },
      (error) => {
        //console.error("Error fetching country data:", error);
      }
    );
  }

  public getSitsetting() {
    this.publicapi.getSiteSetting().subscribe({
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
      this.publicapi.postContactUs(this.contactForm.value).subscribe({
        next: () => {},
        error: () => {},
      });
      console.log(this.contactForm.value);
      this.contactForm.reset();
    } else {
      alert('Fill necessary Details');
    }
  }
}
