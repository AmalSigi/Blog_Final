import { Component } from '@angular/core';
import { ContactUsService } from 'src/app/core/http/contact-us.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-read-meassage',
  templateUrl: './read-meassage.component.html',
})
export class ReadMeassageComponent {
  public commentDiv: boolean = false;
  public messages: any;
  public selectedMessage: any;

  public selectedMessageId!: number;
  public currentPage: number = 1;
  public totalData!: number;
  public totalLength: number = 0;
  // public postsWithComments: any

  constructor(
    private readonly contact: ContactUsService,

    private offsetService: OffsetService
  ) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  public fetchMessages() {
    const offset = this.offsetService.offset();

    const length = this.offsetService.pageSize;

    const read = 'true';

    this.contact.getAllContact(read, length, offset).subscribe({
      next: (respo: any) => {
        this.messages = respo.messages;
        this.totalLength = respo.totalLength;
      },
      error: () => {},
    });
  }

  public onPageChange() {
    this.fetchMessages();
  }
  public showBox(index: number) {
    this.commentDiv = true;

    this.selectedMessageId = this.messages[index].id;

    this.selectedMessage = this.messages[index];

    //this.messages=this.messages[index]
  }

  public unshowBox() {
    this.commentDiv = false;
    this.fetchMessages();
  }
}
