import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryApi } from 'src/app/core/http/category.service';
import { tagApi } from 'src/app/core/http/tag.service';

@Component({
  selector: 'app-postFeatures',
  templateUrl: './postFeatures.component.html',
})
export class PostFeaturesComponent implements OnInit {
  constructor(
    private readonly categoryService: categoryApi,
    private readonly tagsService: tagApi
  ) {}
  public category!: any[];
  public tags!: any[];
  public filteredTags!: any[];
  public selectedTags: any = [];
  public subCategory!: any[];
  public selectDropDown!: string;
  @ViewChild('Category') catagoryInput!: ElementRef;
  @ViewChild('subCatgory') subCatagoryInput!: ElementRef;
  @ViewChild('tags') tagsInput!: ElementRef;
  @Output() createPost = new EventEmitter();
  public featureForm: FormGroup = new FormGroup({
    author: new FormControl(
      { value: 'Robert', disabled: true },
      Validators.required
    ),
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoryId: new FormControl(null, Validators.required),
    subCategoryId: new FormControl(null, Validators.required),
    subCategory: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });
  ngOnInit(): void {
    this.getData();
  }
  public getData() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.category = res;
      },
    });
    this.tagsService.getTags().subscribe({
      next: (response) => {
        console.log(response);
        this.tags = response;
      },
    });
  }
  public changeCategory(index: number): void {
    this.featureForm.controls['category'].patchValue(
      this.category[index - 1].categoryName
    );
    this.featureForm.controls['categoryId'].patchValue(index);

    this.subCategory = this.category[index - 1].subCategories;
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
  
  addTag(tag: string): void {
    this.selectedTags?.push(tag);
  }
  removeTag(id: number): void {
    console.log(id);
    this.selectedTags.splice(id,1);
  }
  ToOpenCreatePage() {
    this.createPost.emit(this.featureForm.value);
    console.log(this.featureForm);
  }
}
