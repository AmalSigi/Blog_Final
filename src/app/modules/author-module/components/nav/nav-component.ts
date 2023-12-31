import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { userApi } from 'src/app/core/http/userAccount.service';
import { environment } from 'src/enviroment/enviroment';
@Component({
  selector: 'author-navbar',
  templateUrl: './nav-component.html',
})
export class AuthorNavBar {
  public mediaFilePath: string = `${environment.url}/assets/`;
  constructor(private userApi: userApi, private route: Router) {}
  @Output() onClick = new EventEmitter();
  @Input() data: any;
  public closeNavbar() {
    this.onClick.emit();
  }
  public user: any;
  ngOnInit() {
    this.userApi.currentUserDetails().subscribe((res) => {
      this.user = res;
    });
  }

  public logOut() {
    if (confirm(`${this.user.firstName} Do you want to Log Out`)) {
      localStorage.clear();
      this.route.navigate(['/login']);
    }
  }
}
