import { Component } from '@angular/core';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-post-draft',
  templateUrl: './draft.component.html',
})
export class PostDraftComponent {
  constructor(
    private readonly postsService: postsAPi,
    private readonly toggleOffset: OffsetService
  ) {}
  public posts: any;
  public offsetValue: number = 0;
  public totalData!: number;

  ngOnInit() {
    this.loadPosts();
    
  }
  public loadPosts() { 
    const offset = this.toggleOffset.offset();
    const inputText=this.toggleOffset.searchInput()
    this.postsService
      .getFilteredPosts('Draft', offset, this.toggleOffset.pageSize,inputText)
      .subscribe({
        next: (response) => {
          this.totalData = response.totalLength;
          this.posts = response;
        },
      });
  }
  public pagiantion() {
    this.loadPosts();
  }
}
