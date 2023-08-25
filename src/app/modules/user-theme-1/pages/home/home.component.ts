import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { categoryApi } from 'src/app/core/http/category.service';
import { editorsPickApi } from 'src/app/core/http/editorsPick.services';
import { postsAPi } from 'src/app/core/http/post.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('slideAnimation', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class UserHomeComponent implements OnInit {
  @ViewChild('swiperContainer') swiperContainer: any;
  apiSlides: any[] = [];
  currentSlideIndex = 0;
  public latestPost?: any = [];
  public catgoryDetailes: any = [];
  public temparray: any = [];
  public editorialPick?: any = [];
  constructor(
    private readonly postApi: postsAPi,
    private readonly categoryApi: categoryApi,
    private readonly editorsPickApi: editorsPickApi
  ) {}
  ngOnInit(): void {
    this.getLatestPost();
    this.getCategory();
    // this.initSwiper();
    this.getEditorsPick();
  }
  public getEditorsPick() {
    this.editorsPickApi.getBlogEditorsPick().subscribe({
      next: (response) => {
        console.log(response);
        response.forEach((post: any) => {
          this.getPost(post.postId);
        });
      },
    });
  }
  public getPost(postId: number) {
    this.postApi.getBlogPostById(postId).subscribe((respo) => {
      this.temparray.push(respo);
      this.editorialPick = this.postToArray(this.temparray);
      console.log(this.editorialPick);
    });
  }

  public getLatestPost() {
    const length = 4;
    this.postApi.getLatestPosts(length).subscribe((respo) => {
      console.log(respo);
      const categoryName = respo.category?.categoryName;
      this.latestPost = this.postToArray(respo);

      console.log(this.latestPost);
      this.apiSlides = [...this.latestPost];
    });
  }

  // category
  public getCategory() {
    let categoryId: any;
    let categoryName: any;

    this.categoryApi.getCategory().subscribe((respo: any) => {
      respo.forEach((element: any) => {
        this.getCategoryPost(element);
      });
    });
  }

  public getCategoryPost(category: any) {
    this.postApi
      .getPostByCategoryByLength(category.id, 4)
      .subscribe((respo: any) => {
        if (respo.length > 0) {
          let categoryName = category.categoryName;
          let obj = {
            categoryId: category.id,
            categoryName: category.categoryName,
            categoryPost: this.postToArray(respo),
          };
          this.catgoryDetailes.push(obj);
          // console.log(this.catgoryDetailes);
        }
      });
  }

  public postToArray(post: any) {
    let temp: any = [];
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
      let obj = {
        postId: element.id,
        heading: heading[0],
        subHeading: subHeading[0],
        img: img[0],
        categoryName: element.category?.categoryName || 'Uncategorized',
        viewCount: element.viewCount,
        createdAt: element.createdAt,
      };

      temp.push(obj);
    });
    return temp;
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    new Swiper(this.swiperContainer.nativeElement, {
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  getImageUrl(imgPath: string): string {
    return 'http://192.168.29.97:5296/assets/' + imgPath;
  }
}
