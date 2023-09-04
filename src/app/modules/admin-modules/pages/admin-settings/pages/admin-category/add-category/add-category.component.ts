import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { categoryApi } from 'src/app/core/http/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly categoryService: categoryApi,
    private readonly toster: ToastrService
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
    this.categoryService.postCategory(this.categoryForm.value).subscribe({
      next: (respo: any) => {
        this.toster.success(
          `New category ${this.categoryForm.controls['categoryName'].value} is added`
        );
        this.categoryForm.reset();
        this.getCategory();
      },
      error: () => {},
      complete: () => {},
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
    this.categoryService.postSubcategory(this.subCategoryForm.value).subscribe({
      next: (repo: any) => {
        this.subCategoryForm.reset();
        this.newSubCategoryArray = [];
        this.toster.success(`New Subcategory is added`);
      },
      error: () => {},
      complete: () => {},
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
            this.toster.success(
              `New cover picture for category ${this.categoryCoverPictureForm.controls['category'].value} is added`
            );
          },
          error: (response) => {
            alert('Error updating profile picture:');
          },
        });
    }
  }
}
