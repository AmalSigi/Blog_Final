import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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

    private readonly postService: postsAPi,
    private readonly route: ActivatedRoute
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
  @Output() change = new EventEmitter();
  @Input() currentTool!: number;

  public featureForm: FormGroup = new FormGroup({
    author: new FormControl({ value: '', disabled: true }, Validators.required),
    authorId: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    categoryId: new FormControl(null, Validators.required),
    subCategoryId: new FormControl(null, Validators.required),
    subCategory: new FormControl(''),
    tags: new FormArray([]),
    newTag: new FormControl(''),
    font: new FormControl(''),
  });
  get tagList(): FormArray {
    return this.featureForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['postId']) {
        const postId = params['postId'];
console.log(postId)
        this.postService.getPostById(postId).subscribe({
          next: (data) => {

            const postData = data;
            console.log(data);
            this.categoryService
              .getSubcategory(postData.category.id)
              .subscribe({
                next: (data) => {
                  this.subCategory = data;
                },
              });

            this.featureForm.controls['author'].setValue(
              `${postData.author.firstName} ${postData.author.lastName}`
            );
            this.featureForm.controls['category'].setValue(postData.categoryId);
            this.featureForm.controls['subCategory'].setValue(
              postData.subCategoryId
            );
            this.featureForm.controls['categoryId'].setValue(
              postData.categoryId
            );
            this.featureForm.controls['subCategoryId'].setValue(
              postData.categoryId
            );
            this.featureForm.controls['font'].setValue(postData.postFont);
            data.postTags.forEach((tag: any) => {
              this.selectedTags.push(tag.tag);
            });
          },
        });
      }
      this.ToOpenCreatePage();
    });

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
        this.ToOpenCreatePage();
      },
    });
  }
  public changeCategory(event: Event): void {
    const selectedIndex: any = (event.target as HTMLSelectElement).value;
    console.log(selectedIndex);
    // this.featureForm.controls['category'].patchValue(
    //   this.category[selectedIndex - 1].categoryName
    // );
    this.featureForm.controls['categoryId'].patchValue(selectedIndex);
    this.categoryService.getSubcategory(selectedIndex).subscribe({
      next: (data) => {
        this.subCategory = data;
      },
    });
    this.ToOpenCreatePage();
  }
  public changeSubCategory(event: Event): void {
    const selectedIndex: any = (event.target as HTMLSelectElement).value;

    this.featureForm.controls['subCategoryId'].patchValue(selectedIndex);

    this.ToOpenCreatePage();
  }

  public onInputChange(event: any): void {
    const inputValue = event.target.value.trim().toLowerCase();
    this.filteredTags = this.tags.filter((tag: any) =>
      tag.tagName.toLowerCase().includes(inputValue)
    );
  }

  public addTag(tag: string): void {
    this.selectedTags?.push(tag);
    this.ToOpenCreatePage();
  }

  public removeTag(id: number): void {
    this.selectedTags.splice(id, 1);
    this.tagList.removeAt(id);
    console.log(this.tagList.value)
    this.ToOpenCreatePage();
  }
  public addnewTag() {
    const newTagArray: any = [];
    const obj = {
      tagname: '#' + this.featureForm.controls['newTag'].value,
    };
    newTagArray.push(obj);
    this.tagsService.postTags(newTagArray).subscribe({
      next: () => {
        this.featureForm.controls['newTag'].reset();
        this.getData();
      },
    });
  }
  fontFamilies: string[] = [
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
  ];

  public ToOpenCreatePage() {
    console.log(this.selectedTags);
    this.selectedTags.forEach((tag: any) => {
      const isTagAlreadyInList = this.tagList.controls.some(
        (existingTag: any) => existingTag.get('id').value === tag.id
      );
console.log(isTagAlreadyInList)
      if (!isTagAlreadyInList) {
        const tagFormGroup = new FormGroup({
          id: new FormControl(tag.id),
          tagName: new FormControl(tag.tagName),
        });
        this.tagList.push(tagFormGroup);
        console.log(this.tagList.value)
      }
    });
    console.log(this.featureForm.value);
    this.createPost.emit(this.featureForm.value);
  }
  public openDropDown(type: string) {
    this.showDropDown = !this.showDropDown;
    this.selectDropDown = type;
  }
  public selectFont() {
    this.createPost.emit(this.featureForm.value);
  }
}
