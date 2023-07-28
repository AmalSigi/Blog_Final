import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addPostSettings',
  templateUrl: './addPostSettings.component.html',
})
export class AddPostSettingsComponent {
@Input() height: string='400px';
@Input() width!: string;
@Output() onChange=new EventEmitter();
  public imgForm: FormGroup=new FormGroup({
    height:new FormControl(this.height),
    width:new FormControl(this.width)
  })
  changeHeight(event:any):void{
    this.onChange.emit(event.target?.value);
  }
}
