import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { categoryApi } from 'src/app/core/http/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
})
export class SubCategoryComponent implements OnInit {
  @Input() categoryId?: any;

  @Output() childEvent = new EventEmitter<boolean>();
  public category: any;
  constructor(
    private readonly categoryApi: categoryApi,
    private readonly toster: ToastrService
  ) {}
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

  public deleteSubcategory(subcategory: any) {
    console.log(subcategory);
    this.categoryApi.deleteSubCat(subcategory.id).subscribe({
      next: (respo: any) => {
        this.toster.success(
          `Category ${subcategory.subCategoryName} is deleted`
        );
        this.getCategory();
      },
      error: () => {},
      complete: () => {},
    });
  }
  public deleteCategory(category: any) {
    this.categoryApi.deleteCat(category.id).subscribe({
      next: (respo: any) => {
        this.toster.success(`Sub-Category ${category.categoryName} is deleted`);
        this.modelUnShow();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
