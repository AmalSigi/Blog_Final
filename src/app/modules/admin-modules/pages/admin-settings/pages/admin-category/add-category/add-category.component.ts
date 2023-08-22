import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryApi } from 'src/app/core/http/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly categoryService: categoryApi
  ) {}
  public fileToUpload: any;
  public category: any;
  public newSubCategoryArray: any = [];
  public selectDropDownAddCover: boolean = false;
  public selectDropDownAddSub: boolean = false;

  // caegory form
  public categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
  });

  // cover picture form

  public categoryCoverPictureForm: FormGroup = new FormGroup({
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoryId: new FormControl('', Validators.required),
  });

  // subcategory form
  public subCategoryForm: FormGroup = new FormGroup({
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoryId: new FormControl('', Validators.required),
    newSub: new FormControl('', Validators.required),
    subcategoryName: new FormControl(
      this.newSubCategoryArray,
      Validators.required
    ),
  });
  ngOnInit(): void {
    this.getCategory();
  }
  // CATEGORY
  public postCategory() {
    this.categoryService
      .postCategory(this.categoryForm.value)
      .subscribe((respo) => {
        this.categoryForm.reset();
        this.getCategory();
      });
  }
  public getCategory() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.category = res;
      },
    });
  }

  public openDropdwonAddSub() {
    this.selectDropDownAddSub = !this.selectDropDownAddSub;
  }
  public openDropdwonAddCover() {
    this.selectDropDownAddCover = !this.selectDropDownAddCover;
  }

  // SUBCATEGORY

  public changeCategory(index: number): void {
    this.subCategoryForm.controls['category'].patchValue(
      this.category[index - 1].categoryName
    );
    this.subCategoryForm.controls['categoryId'].patchValue(index);
    this.openDropdwonAddSub();
  }

  public addNewSubToarray(addSub: any) {
    if (addSub != '') {
      const subOj = { subcategoryName: addSub };
      this.newSubCategoryArray?.push(subOj);
      console.log(this.newSubCategoryArray);
      this.subCategoryForm.get('newSub')?.reset();
    }
  }

  public postSubCategory() {
    this.categoryService
      .postSubcategory(this.subCategoryForm.value)
      .subscribe((respo) => {
        this.subCategoryForm.reset();
        this.newSubCategoryArray = [];
      });
  }

  removeSubCategory(id: number): void {
    this.newSubCategoryArray.splice(id, 1);
  }
  // add cover picture

  public changeCategoryForCoverPicture(index: number): void {
    this.categoryCoverPictureForm.controls['category'].patchValue(
      this.category[index - 1]!.categoryName
    );
    this.categoryCoverPictureForm.controls['categoryId'].patchValue(index);
    this.openDropdwonAddCover();
  }
  public fileImport(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  public postCategoryCoverPicture() {
    if (this.fileToUpload) {
      const formData = new FormData();

      formData.append('picture', this.fileToUpload, this.fileToUpload.name);

      this.categoryService
        .postCategoryCoverPicture(
          this.categoryCoverPictureForm.controls['categoryId'].value,
          formData
        )
        .subscribe({
          next: (response) => {
            alert('Profile updated');
            this.categoryCoverPictureForm.reset();
          },
          error: (response) => {
            alert('Error updating profile picture:');
          },
        });
    }
  }
}
