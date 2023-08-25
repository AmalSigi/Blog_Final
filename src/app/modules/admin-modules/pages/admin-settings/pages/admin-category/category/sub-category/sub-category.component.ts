import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { categoryApi } from 'src/app/core/http/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
})
export class SubCategoryComponent implements OnInit {
  @Input() categoryId?: any;

  @Output() childEvent = new EventEmitter<boolean>();
  public category: any;
  constructor(private readonly categoryApi: categoryApi) {}
  ngOnInit(): void {
    this.getCategory();
  }
  public getCategory() {
    this.categoryApi.getCategoryById(this.categoryId).subscribe({
      next: (respo: any) => {
        console.log(respo);
        this.category = respo;
      },
      error: () => {},
    });
  }
  public modelUnShow(): void {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public deleteSubcategory(subCateId: number) {
    this.categoryApi.deleteSubCat(subCateId).subscribe({
      next: (respo: any) => {
        this.getCategory();
      },
      error: () => {},
      complete: () => {
        alert('SubCategory Delete Successfully');
      },
    });
  }
  public deleteCategory(cateId: number) {
    this.categoryApi.deleteCat(cateId).subscribe({
      next: (respo: any) => {
        this.modelUnShow();
      },
      error: () => {},
      complete: () => {
        alert('Category Delete Successfully');
      },
    });
  }
}
