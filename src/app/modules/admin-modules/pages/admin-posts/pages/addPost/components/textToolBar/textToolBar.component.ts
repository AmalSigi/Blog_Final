import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector:'app-text-Toolbar',
    templateUrl:'./textToolBar.component.html'
})
export class TextToolbarComponent{
    constructor(){}
    public showUrlInput:boolean = false;
    public urlForm:FormGroup=new FormGroup({
        url:new FormControl('')
    })
    @Input() text!:string;
    @Output() boldSelected=new EventEmitter();
    @Output() sendUrl=new EventEmitter();
    public applyBold(item:string): void{
        this.boldSelected.emit(item)
    }
   public applyUrl(){
this.sendUrl.emit(this.urlForm.controls['url'].value);
this.showUrlInput=false;
this.urlForm.reset()
    }
}