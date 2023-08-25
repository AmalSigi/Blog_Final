import { Component, OnInit } from '@angular/core';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-editorsPick',
  templateUrl: './editorsPick.component.html',
})
export class EditorsPickComponent implements OnInit {
  constructor(
    private readonly editorService: editorsPickApi,
    private readonly postApi: postsAPi,
    private readonly setOffsetService: OffsetService
  ) {}
  public posts: any = [];
  public totalData!: number;

  ngOnInit() {
    this.loadPost();
  }
  public loadPost() {
    const offset = this.setOffsetService.offset();
    const length = this.setOffsetService.pageSize;
    this.editorService.getBlogEditorsPick().subscribe({
      next: (resp) => {
        console.log(resp);
        this.totalData = resp.length;
        
        resp.forEach((post: any) => {
         
          this.posts.push( this.getPost(post.postId))
        });
        
      },
    });
  }
  public getPost(postId: number) {
    let temp: any 
    this.postApi.getPostById(postId).subscribe({
      next: (response) => {
        console.log(response);
        temp=response;

        // const body = {
        //   id: post.id,
        //   post: response,
        // };
      },
    });
    return temp;
    console.log(this.posts);
  }
  public pagiantion() {
    this.loadPost();
    this.posts = [];
  }
}
