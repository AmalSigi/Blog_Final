import { Component, OnInit } from '@angular/core';
import { categoryApi } from 'src/app/core/http/category.service';

@Component({
  selector: 'appa-category',
  templateUrl: './AuthurCategory.component.html',
})
export class AuthorCategoryComponents implements OnInit {
  constructor(

 
    private readonly categoryServices: categoryApi
  ) {}
  public showmodel1: boolean = false;
  public showmodel2: boolean = false;
  public modelCategory: any;
  public category: any;
  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    this.categoryServices.getCategory().subscribe((repo) => {
      this.category = repo;
      console.log(repo);
    });
  }
  public modelShowAdd(category: any): void {
    this.modelCategory = category;
    this.showmodel1 = true;
  }
  public modelUnShowAdd(value: boolean): void {
    this.showmodel1 = value;
    this.showmodel2 = value;
  }
}
