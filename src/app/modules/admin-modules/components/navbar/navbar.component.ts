import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public mediaFilePath: string = `${environment.url}/assets/`;
  constructor(private readonly route: Router) {}
  @Output() onClick = new EventEmitter();
  @Input() data: any;
  public closeNavbar() {
    this.onClick.emit();
  }

  public logOut() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
