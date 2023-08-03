import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-text-Toolbar',
    templateUrl:'./textToolBar.component.html'
})
export class TextToolbarComponent{
    constructor(){}
    @Input() text!:string;
    @Output() boldSelected=new EventEmitter();
    public applyBold(): void{
        this.boldSelected.emit(this.text)
    }
}