import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html'
})
export class NavbarComponent{
constructor(){}
@Output() onClick = new EventEmitter();
@Input() data:any;
public closeNavbar(){
    this.onClick.emit();
}
}