import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
})
export class SubCategoryComponent implements OnInit {
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
