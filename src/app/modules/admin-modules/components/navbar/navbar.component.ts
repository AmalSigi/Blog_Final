import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html'
})
export class NavbarComponent{
constructor(){}
@Output() onClick = new EventEmitter();
public closeNavbar(){
    this.onClick.emit();
}
}