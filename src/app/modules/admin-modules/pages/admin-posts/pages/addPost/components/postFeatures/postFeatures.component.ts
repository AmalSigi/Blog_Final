import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryApi } from 'src/app/core/http/category.service';
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
    private readonly userService: userApi
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
    authorId: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoryId: new FormControl(null, Validators.required),
    subCategoryId: new FormControl(null, Validators.required),
    subCategory: new FormControl({ value: '', disabled: true }),
    tags:new FormArray([])
  });
  get tagList(): FormArray {
    return this.featureForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.getData();
  }
  public getData() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.category = res;
      },
    });
    this.tagsService.getTags().subscribe({
      next: (response) => {
        console.log(response);
        this.tags = response.tags;
      },
    });
    this.userService.currentUserDetails().subscribe({
      next: (response) => {
        console.log(response);
        this.featureForm.controls['author'].patchValue(
          `${response.firstName} ${response.lastName}`
        );
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
    console.log(this.subCategory);
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

  addTag(tag: string): void {
    this.selectedTags?.push(tag);
  }
  removeTag(id: number): void {
    console.log(id);
    this.selectedTags.splice(id, 1);
  }
  ToOpenCreatePage() {
    this.createPost.emit(this.featureForm.value);
    this.selectedTags.forEach((tag:any) => {
      console.log(tag)
      // this.tagList.push(tag);
    })
    console.log(this.featureForm.value);
  }
  openDropDown(type: string) {
    this.showDropDown = !this.showDropDown;
    this.selectDropDown = type;
  }
}
