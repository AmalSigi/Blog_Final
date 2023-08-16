import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';
import { OffsetService } from 'src/app/core/services/pagination.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';
import { ClickOutsideDirective } from 'src/app/core/directives/clcickOutside.directive';

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
    private renderer: Renderer2, private el: ElementRef
  ) {}
  // public posts:any;
  public viewPost: any;
  public showDiv: boolean = true;
  public enableSearch: boolean = false;
  public listIndex!: number;
  public draft!: boolean;
  public published!: boolean;
  public trash!: boolean;
  public picks!: boolean;

  @Input() posts: any;
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
        const enablePicks = url.some(
          (segment) => segment.path == 'Editor-pick'
        );
        if (enablePublish) {
          this.published = true;
        } else if (enableDarafts) {
          this.draft = true;
        } else if (enableTrash) {
          this.trash = true;
        } else {
          this.picks = true;
        }
      },
    });
  }
  public toggleEditMenu(data: any, index: number) {
    this.listIndex = index;
    this.showDiv = !this.showDiv;
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
      // Clicked outside the child component, close it
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
    console.log(event.target.value);
    this.toggleInputService.toggleInputData(event.target.value);
    // if(event.target.value){
    //   this.paginate.emit(event.target.value);

    // }
    // else{
    this.paginate.emit();

    // }
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
  public DisableEdit(){
    if(this.showDiv==true){
      this.showDiv = false;
    }
    else{
      this.showDiv = true;
    }
  }
  
  
}
