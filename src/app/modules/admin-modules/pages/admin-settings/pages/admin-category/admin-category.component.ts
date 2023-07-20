import { Component, OnInit } from '@angular/core';
import { postData } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
})
export class AdminCategoryComponent implements OnInit {
  constructor(private readonly cat: postData) {}
  public category: any;
  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    this.category = this.cat.Category;
    console.log(this.category);
  }
}
