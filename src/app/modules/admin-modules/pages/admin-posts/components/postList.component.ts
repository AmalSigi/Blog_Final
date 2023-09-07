import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { editorsPickApi } from 'src/app/core/http/editorsPick.services';

import { postsAPi } from 'src/app/core/http/post.service';

import { OffsetService } from 'src/app/core/services/pagination.service';

import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-postList',

  templateUrl: './postList.component.html',
})
export class PostListComponent {
  commentDiv: boolean = false;

  constructor(
    private readonly postsService: postsAPi,

    private readonly elementRef: ElementRef,

    private readonly toggleInputService: OffsetService,

    private readonly editorsPickApi: editorsPickApi,

    private readonly route: ActivatedRoute,

    private readonly trackCount: trackDataService,
    private readonly postApi: postsAPi,

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

  @Input() posts?: any;

  @Input() offsetValue!: number;

  @Input() pageLength!: number;

  @Input() totalData!: number;

  ngOnInit() {
    this.route.url.subscribe({
      next: (url) => {
        const enablePublish = url.some(
          (segment) => segment.path == 'published'
        );

        const enableDarafts = url.some((segment) => segment.path == 'drafts');

        const enableTrash = url.some((segment) => segment.path == 'trashed');
        const enableUncategorized = url.some(
          (segment) => segment.path == 'Uncategorized-post'
        );

        if (enablePublish) {
          this.published = true;
        } else if (enableDarafts) {
          this.draft = true;
        } else if (enableTrash) {
          this.trash = true;
        } else if (enableUncategorized) {
          this.uncategorized = true;
        } else {
          this.picks = true;
          this.posts = this.posts.post;
        }
      },
    });
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

  public showBox(index: number) {
    this.commentDiv = true;

    this.viewPost = this.posts[index];
  }

  public unshowBox() {
    this.commentDiv = false;
  }

  onDocumentClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDiv = false;
    }
  }

  @Output() paginate = new EventEmitter();

  public emitPages() {
    this.paginate.emit();
  }

  public publishPost(id: number) {
    this.postsService.approvePost(id).subscribe({
      next: () => {
        alert('post successfully approved');

        this.paginate.emit();

        this.trackCount.sendClickEvent1();
      },

      error: () => {
        alert('error');
      },
    });
  }

  public deletePost(id: number): void {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        alert('delete successfully');

        this.paginate.emit();

        this.trackCount.sendClickEvent1();
      },

      error: () => {
        alert('error');

        this.paginate.emit();
      },
    });
  }

  searchPostByName(event: any) {
    this.toggleInputService.toggleInputData(event.target.value);

    this.paginate.emit();
  }

  public RemovePick(postId: number) {
    if (confirm('Are you sure you want to remove')) {
      this.editorsPickApi.deletepick(postId).subscribe({
        next: () => {
          alert('Post removed successfully');

          this.paginate.emit();

          this.trackCount.sendClickEvent1();
        },
      });
    }
  }

  hideDivOnOutsideClick(event: MouseEvent, index: number) {
    const divElement = this.el.nativeElement.querySelector(`.div-${index}`);

    const clickedInsideDiv = divElement.contains(event.target);

    if (clickedInsideDiv) {
      this.showDiv = false;
    }
  }

  public DisableEdit() {
    if (this.showDiv == true) {
      this.showDiv = false;
    } else {
      this.showDiv = true;
    }
  }

  public addEditorsPick(postId: number) {
    const bodyarray: any = [];
    const body = {
      postId: postId,
    };
    bodyarray.push(body);

    this.editorsPickApi.postEditorsPick(bodyarray).subscribe({
      next: (respo: any) => {
        alert("This post is added to Editor's Pick");
        this.paginate.emit();
        this.trackCount.sendClickEvent1();
      },
      error: (error) => {},
    });
  }
  public onCheckboxChange(event: any, id: number) {
    //  const status=event.target.checked
    this.postApi.toggleComments(id).subscribe({
      next: () => {},
      error: (error) => {
        alert(error.message + 'please try again');
      },
    });
  }

  // delete post permanently
  public deletePostPremanently(postId: number) {
    this.postsService.deletePostpermanently(postId).subscribe({
      next: () => {
        alert('Post Deleted Permanently');
        this.paginate.emit();

        this.trackCount.sendClickEvent1();
      },
      error: () => {},
    });
  }
}
