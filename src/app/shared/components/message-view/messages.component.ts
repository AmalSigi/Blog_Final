import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ContactUsService } from 'src/app/core/http/contact-us.service';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
})
export class MessageViewComponent {
  constructor(
    private contactService: ContactUsService,
    private readonly route: ActivatedRoute
  ) {}

  @Output() onClick = new EventEmitter();

  @Input() messageId!: number;

  public message: any[] = [];

  ngOnInit() {
    this.fetchMessage();
  }

  public unshowBox() {
    this.onClick.emit();
  }

  fetchMessage(): void {
    this.contactService
      .getMessagesById(this.messageId)
      .subscribe((data: any) => {
        console.log(data);
        this.message.push(data);
      });
  }

  generateMailtoLink(email: string, message: string): string {
    const subject = `Re: ${this.getFirstWords(message, 10)}`;

    return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  }

  getFirstWords(text: string, wordCount: number): string {
    const words = text.split(' ');

    return words.slice(0, wordCount).join(' ');
  }
}
