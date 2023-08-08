import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  public navBar: boolean=false;
  public showNavbar(){
    this.navBar = false;
  }
}
