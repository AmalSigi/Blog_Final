import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'author-home',
  templateUrl: './author-module.component.html',
})
export class AuthorComponent {
  constructor(
    private readonly userService: userApi,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public navBar: boolean = false;
  public data: any;
  public showNavbar() {
    this.navBar = false;
    const currentRoute = this.route.snapshot.url.join('/');

    if (currentRoute === 'AddNew') {
      this.navBar = false;
    }
  }
  ngOnInit() {
    this.userService.currentUserDetails().subscribe({
      next: (result) => {
        this.data = result;
      },
    });
  }
}
