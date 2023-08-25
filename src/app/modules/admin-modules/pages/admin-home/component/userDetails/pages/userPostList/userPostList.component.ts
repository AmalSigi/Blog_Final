import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { postsAPi } from 'src/app/core/http/post.service';
import { postFilterService } from 'src/app/core/services/filteredData.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './userPostList.component.html',
})
export class UserPostsComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private postService: postsAPi,
    private readonly filterPosts: postFilterService
  ) {}

  userId!: number;
  userPosts: any[] = [];
  public allPosts!: any;
  public viewPost: boolean = false;
  public post!: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.loadPosts();
    });
  }

  public loadPosts() {
    this.postService.authorizedPosts(this.userId).subscribe((response: any) => {
      this.allPosts = response;
      response.posts.forEach((post: any) => {
        this.userPosts.push(this.filterPosts.getPost(post));
      });
    });
  }
  public openModal(index: any) {
    this.viewPost = true;
    this.post = this.allPosts.posts[index];
   
  }
}
