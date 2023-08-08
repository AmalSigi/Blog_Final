import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  constructor() {}
  @Input() category!: any[];
  ngOnInit(): void {}
  @Output() onChange = new EventEmitter();
  public changeCategory(index: number): void {
    this.onChange.emit(index);
  }
}
