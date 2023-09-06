import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactUsService } from 'src/app/core/http/contact-us.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
})
export class AdminMessagesComponent implements OnInit {
  public totalLength: any;
  constructor(private readonly contact: ContactUsService,private readonly refresh:trackDataService) {}
  ngOnInit(): void {
    this.fetchMessages();
  }
  public refreshData:Subscription=this.refresh.getClickEvent1().subscribe(()=>{
    this.fetchMessages();
  })
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
