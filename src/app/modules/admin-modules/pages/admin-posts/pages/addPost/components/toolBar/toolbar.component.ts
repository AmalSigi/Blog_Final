import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToobarComponent{
    constructor(){
    }
    public showToolBar: boolean = false;
@Input() index!:number;
@Output() select=new EventEmitter();
@Output() delete=new EventEmitter();

addBlock(type:number){
    this.select.emit(type);

}
deleteBlock(){
  this.delete.emit();
}
}