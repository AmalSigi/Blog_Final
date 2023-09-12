import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-editorsPick',
  templateUrl: './editorsPick.component.html',
})
export class EditorsPickComponent implements OnInit {
  commentDiv: boolean = false;

  constructor(
    private readonly postsService: postsAPi,

    private readonly elementRef: ElementRef,

    private readonly toggleInputService: OffsetService,

    private readonly editorService: editorsPickApi,

    private readonly route: ActivatedRoute,

    private readonly trackCount: trackDataService,
    private readonly postApi: postsAPi,
    private readonly setOffsetService: OffsetService,

    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  public viewPost: any;

  public showDiv: boolean = true;

  public enableSearch: boolean = false;

  public listIndex!: number;

  public draft!: boolean;

  public published!: boolean;

  public trash!: boolean;

  public picks!: boolean;
  public uncategorized!: boolean;
  public totalData!: number;
  public posts: any = [];
  @Output() paginate = new EventEmitter();

  ngOnInit() {
    this.loadPost();
  }
  public loadPost() {
    const offset = this.setOffsetService.offset();
    const length = this.setOffsetService.pageSize;
    this.editorService.EditorsPick().subscribe({
      next: (resp) => {
        this.totalData = resp.length;

        resp.forEach((post: any) => {
          this.getPost(post.postId, post.id);
        });
      },
    });
  }
  public getPost(postId: number, pickId: number) {
    let temp: any;
    this.postApi.getPostById(postId).subscribe({
      next: (response) => {
        temp = response;

        temp = {
          id: pickId,
          post: response,
        };
        this.posts.push(temp);
      },
    });
  }

  public emitPages() {
    this.paginate.emit();
  }
  public pagiantion() {
    this.loadPost();
    this.posts = [];
  }
  public enableCommentForm: FormGroup = new FormGroup({
    enableComment: new FormControl(''),
  });
  public toggleEditMenu(data: any, index: number) {
    if (this.listIndex == index && this.showDiv == true) {
      this.showDiv = false;
    } else {
      this.listIndex = index;
      this.showDiv = true;
    }
    this.postApi.getPostById(data.id).subscribe({
      next: (result) => {
        const commentStatus = JSON.parse(result?.enableComments);
        this.enableCommentForm.controls['enableComment'].setValue(
          commentStatus
        );
      },
    });
  }
  public RemovePick(postId: number) {
    if (confirm('Are you sure you want to remove')) {
      this.editorService.deletepick(postId).subscribe({
        next: () => {
          alert('Post removed successfully');
          this.posts = [];
this.trackCount.sendClickEvent1();
          this.loadPost();
          this.showDiv = false;
        },
      });
    }
  }
  public showBox(index: number) {
    this.commentDiv = true;

    this.viewPost = this.posts[index].post;
  }

  public unshowBox() {
    this.commentDiv = false;
  }
  public searchPostByName(event: any) {
    this.toggleInputService.toggleInputData(event.target.value);

    this.paginate.emit();
  }
}
