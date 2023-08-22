import { Component, OnInit } from '@angular/core';
import { categoryApi } from 'src/app/core/http/category.service';
import { trackDataService } from 'src/app/core/subjects/trackData.subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public showSubCat: boolean = false;
  public showCategory: boolean = false;
  public index!: number;
  public category: any;
  constructor(
    private readonly categoryApi: categoryApi,
    private readonly reloadData: trackDataService
  ) {}
  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    this.categoryApi.getCategory().subscribe((response: any) => {
      this.category = response;
    });
  }

  public showSubCategory(index: number) {
    this.index = index;
    this.showSubCat = !this.showSubCat;
  }
  public reload() {
    this.reloadData.sendClickEvent1();
    this.showCategory = false;
    this.showSubCat = !this.showSubCat;
  }
  public moreCategory() {
    this.showCategory = !this.showCategory;
  }
}
