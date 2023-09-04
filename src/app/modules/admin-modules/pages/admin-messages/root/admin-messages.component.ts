import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/core/http/contact-us.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
})
export class AdminMessagesComponent implements OnInit {
  public totalLength: any;
  constructor(private readonly contact: ContactUsService) {}
  ngOnInit(): void {
    this.fetchMessages();
  }
  public fetchMessages() {
    console.log('hi');

    const read = 'false';
    this.contact.getAllContactNo(read).subscribe({
      next: (respo: any) => {
        console.log(respo.totalLength);
        this.totalLength = respo.totalLength;
      },
      error: () => {},
    });
  }
}
