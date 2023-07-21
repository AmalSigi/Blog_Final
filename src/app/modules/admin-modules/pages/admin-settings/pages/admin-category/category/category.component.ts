import { Component, OnInit } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(private readonly cat: postData) {}
  public showmodel1: boolean = false;
  public showmodel2: boolean = false;
  public modelCategory: any;
  public category: any;
  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    this.category = this.cat.Category;
    console.log(this.category);
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
