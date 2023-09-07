import { Component, OnInit } from '@angular/core';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(private readonly userService: userApi) {}
  public navBar: boolean = false;
  public data: any;
  public showNavbar() {
    this.navBar = false;
  }
  ngOnInit() {
    this.userService.currentUserDetails().subscribe({
      next: (result) => {
        this.data = result;
      },
    });
  }
}
