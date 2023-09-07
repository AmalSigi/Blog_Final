import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PublicService } from 'src/app/core/http/public.service';
import Swiper from 'swiper';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  apiSlides: any[] = [];
  slides: any[] = [];
  currentSlideIndex = 0;
  public latestPost?: any = [];
  public catgoryDetailes: any = [];
  public temparray: any = [];
  public editorialPick?: any = [];
  public randomAd: any;
  public mediaFilePath: string = `${environment.url}/assets/`;
  constructor(private readonly publicapi: PublicService) {}
  ngOnInit(): void {
    this.getLatestPost();
    this.getCategory();
    this.getRandom();
    // this.initSwiper();
    this.getEditorsPick();
  }
  public getEditorsPick() {
    this.publicapi.getEditorsPick().subscribe({
      next: (response) => {
        response.forEach((post: any) => {
          this.getPost(post.postId);
        });
      },
    });
  }
  public getPost(postId: number) {
    this.publicapi.getPostByPostId(postId).subscribe((respo) => {
      this.temparray.push(respo);
      this.editorialPick = this.postToArray(this.temparray);
    });
  }

  public getLatestPost() {
    const length = 6;
    this.publicapi.getLatestPosts(length).subscribe((respo) => {
      const categoryName = respo.category?.categoryName;
      this.latestPost = this.postToArray(respo);

      this.apiSlides = [...this.latestPost];
    });
  }

  // category
  public getCategory() {
    let categoryId: any;
    let categoryName: any;

    this.publicapi.getCategory().subscribe((respo: any) => {
      respo.forEach((element: any) => {
        this.getCategoryPost(element);
      });
    });
  }

  public getCategoryPost(category: any) {
    this.publicapi
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
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
  getImageUrl(imgPath: string): string {
    return this.mediaFilePath + imgPath;
  }

  // random ads
  public getRandom() {
    this.publicapi.getThemeRandomAdvertisements().subscribe({
      next: (respo: any) => {
        this.randomAd = respo;
      },
    });
  }
}
