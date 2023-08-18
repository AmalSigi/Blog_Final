import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryApi } from 'src/app/core/http/category.service';
import { postsAPi } from 'src/app/core/http/post.service';
import { tagApi } from 'src/app/core/http/tag.service';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'app-postFeatures',
  templateUrl: './postFeatures.component.html',
})
export class PostFeaturesComponent implements OnInit {
  constructor(
    private readonly categoryService: categoryApi,
    private readonly tagsService: tagApi,
    private readonly userService: userApi,
    private readonly postService:postsAPi,
    private readonly route:ActivatedRoute
  ) {}
  public category!: any[];
  public tags!: any[];
  public filteredTags!: any[];
  public selectedTags: any = [];
  public subCategory!: any[];
  public selectDropDown!: string;
  public showDropDown: boolean = false;
  @ViewChild('Category') catagoryInput!: ElementRef;
  @ViewChild('subCatgory') subCatagoryInput!: ElementRef;
  @ViewChild('tags') tagsInput!: ElementRef;
  @Output() createPost = new EventEmitter();
  public featureForm: FormGroup = new FormGroup({
    author: new FormControl({ value: '', disabled: true }, Validators.required),
    authorId: new FormControl('', Validators.required),
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoryId: new FormControl(null, Validators.required),
    subCategoryId: new FormControl(null, Validators.required),
    subCategory: new FormControl({ value: '', disabled: true }),
    tags: new FormArray([]),
  });
  get tagList(): FormArray {
    return this.featureForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['postId']) {
        const postId = params['postId'];
        this.postService.getPostById(postId).subscribe({
          next: (data) => {
            const postData = data;
            console.log(postData);
            this.featureForm.controls['author'].setValue(
              `${postData.author.firstName} ${postData.author.lastName}`
            );
            this.featureForm.controls['category'].setValue(
              postData.category.categoryName
            );
            this.featureForm.controls['subCategory'].setValue(
              postData.subCategory.subCategoryName

            )
            data.postTags.forEach((tag:any)=>{
this.selectedTags.push(tag.tag)
            })
          },

        });
      }
    })
    this.getData();
  }
  public getData() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.category = res;
      },
    });

    this.tagsService.getAllTags().subscribe({
      next: (response) => {
        this.tags = response.tags;
      },
    });
    this.userService.currentUserDetails().subscribe({
      next: (response) => {
        this.featureForm.controls['author'].patchValue(
          `${response.firstName} ${response.lastName}`
        );
        this.featureForm.controls['authorId'].patchValue(response.id);
      },
    });
  }
  public changeCategory(index: number): void {
    this.featureForm.controls['category'].patchValue(
      this.category[index - 1].categoryName
    );
    this.featureForm.controls['categoryId'].patchValue(index);
    this.categoryService.getSubcategory(index).subscribe({
      next: (data) => {
        this.subCategory = data;
      },
    });
    this.selectDropDown = '';
  }
  public changeSubCategory(index: number): void {
    const location = this.subCategory.findIndex((i) => i.id == index);
    this.featureForm.controls['subCategory'].patchValue(
      this.subCategory[location].subCategoryName
    );
    this.featureForm.controls['subCategoryId'].patchValue(index);

    this.selectDropDown = '';
  }

  public onInputChange(event: any): void {
    const inputValue = event.target.value.trim().toLowerCase();
    this.filteredTags = this.tags.filter((tag: any) =>
      tag.tagName.toLowerCase().includes(inputValue)
    );
  }

  public addTag(tag: string): void {
    this.selectedTags?.push(tag);
  }
  public removeTag(id: number): void {
    this.selectedTags.splice(id, 1);
  }
  public ToOpenCreatePage() {
    this.selectedTags.forEach((tag: any) => {
      const tagFormGroup = new FormGroup({
        id: new FormControl(tag.id),
        tagName: new FormControl(tag.tagName),
      });
      this.tagList.push(tagFormGroup);
    });
    this.createPost.emit(this.featureForm.value);

    console.log(this.featureForm.value)
  }
  public openDropDown(type: string) {
    this.showDropDown = !this.showDropDown;
    this.selectDropDown = type;
  }
}
