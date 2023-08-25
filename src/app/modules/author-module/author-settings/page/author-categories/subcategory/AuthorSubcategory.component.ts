import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'author-sub-category',
  templateUrl:'./AuthorSubcategory.component.html'
})
export class AuthorSubCategoryComponent implements OnInit {
  @Input() category?: any;
  @Output() childEvent = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit(): void {
    console.log(this.category);
  }
  public modelUnShow(): void {
    const value: boolean = false;
    this.childEvent.emit(value);
  }
}
