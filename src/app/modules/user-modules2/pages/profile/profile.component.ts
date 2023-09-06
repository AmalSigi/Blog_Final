import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from 'src/app/core/http/public.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class UserProfileComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly publicapi: PublicService
  ) {}
  user: any;
  authorId!: number;
  posts: any[] = [];
  totalLength: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.authorId = +params['authorId'];

      this.fetchUserDataAndPosts();
    });
  }
  fetchUserDataAndPosts(): void {
    this.publicapi.getPostByAuthorId(this.authorId).subscribe(
      (data: any) => {
        this.user = data.posts[0].author;
        console.log(this.user);
        this.posts = this.postToArray(data.posts);
        this.posts.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.totalLength = data.totalLength;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  public postToArray(post: any[]): any {
    let temp: any[] = [];
    post.forEach((element: any) => {
      let heading = element.postSections.filter(
        (item: any) => item.sectionTypeId == 1
      );
      let img = element.postSections.filter(
        (item: any) => item.sectionTypeId == 4
      );

      let subHeading = element.postSections.filter(
        (item: any) => item.sectionTypeId == 2
      );
      this.publicapi
        .getCommentsCount(element.id, 'Active')
        .subscribe((commentsCountResponse) => {
          const commentsCount = commentsCountResponse.count;
          let obj = {
            postId: element.id,
            heading: heading[0],
            subHeading: subHeading[0],
            img: img[0],
            categoryName: element.category?.categoryName || 'Uncategorized',
            viewCount: element.viewCount,
            createdAt: element.createdAt,
            //fullName:element.author.firstName + ' ' + element.author.lastName,
            commentsCount: commentsCount,
          };

          temp.push(obj);
        });
    });
    return temp;
  }
}
