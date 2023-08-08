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
  public category: any;
  public newSubCategoryArray: any = [];
  public selectDropDown: boolean = false;
  // caegory form
  public categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
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
      });
  }
  public getCategory() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.category = res;
      },
    });
  }

  public openDropdwon() {
    this.selectDropDown = !this.selectDropDown;
  }

  // SUBCATEGORY

  public changeCategory(index: number): void {
    this.subCategoryForm.controls['category'].patchValue(
      this.category[index - 1].categoryName
    );
    this.subCategoryForm.controls['categoryId'].patchValue(index);
    this.openDropdwon();
  }

  public postSubCategory() {
    console.log(this.subCategoryForm.value);
    this.categoryService
      .postSubcategory(this.subCategoryForm.value)
      .subscribe((respo) => {
        this.subCategoryForm.reset();
      });
  }

  public addNewSubToarray(addSub: any) {
    const subOj = { subcategoryName: addSub };
    this.newSubCategoryArray?.push(subOj);
    this.subCategoryForm.get('newSub')?.reset();
  }

  removeSubCategory(id: number): void {
    console.log(id);
    this.newSubCategoryArray.splice(id, 1);
  }
}
