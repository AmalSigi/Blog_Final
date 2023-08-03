import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  constructor(private readonly http: HttpClient) {}
  public categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
  });

  public subCategoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl('', Validators.required),
    subcategoryName: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getCategory();
    this.getSubCategory();
  }
  // CATEGORY
  public postCategory() {
    this.http
      .post('http://192.168.29.155:5138/api/Category', this.categoryForm.value)
      .subscribe((respo) => {
        console.log(respo);
      });
  }
  public getCategory() {
    this.http
      .get('http://192.168.29.155:5138/api/Category')
      .subscribe((respo) => {
        console.log(respo);
      });
  }

  // SUBCATEGORY

  public postSubCategory() {
    this.http
      .post(
        'http://192.168.29.155:5138/api/SubCatagory',
        this.subCategoryForm.value
      )
      .subscribe((respo) => {
        console.log(respo);
      });
  }
  public getSubCategory() {
    this.http
      .get('http://192.168.29.155:5138/api/SubCatagory')
      .subscribe((respo) => {
        console.log(respo);
      });
  }
}
