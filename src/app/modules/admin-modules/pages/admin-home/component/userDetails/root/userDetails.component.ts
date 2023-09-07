import { Component, OnInit } from '@angular/core';
import { userApi } from 'src/app/core/http/userAccount.service';

@Component({
  selector: 'app-user',
  templateUrl: './userDetails.component.html',
})
export class UsersDetailsComponents implements OnInit {
  constructor(private readonly usersApi: userApi) {}
  public activeUsers: any;
  public deletedUsers: any;
  public blockedUsers: any;
  ngOnInit(): void {
    this.getUsers();
  }
  public getUsers() {
    this.usersApi.getUsers().subscribe({
      next: (respo) => {
        this.activeUsers = respo.users.filter(
          (user: any) => user.accountStatus === 'Active'
        );
        this.blockedUsers = respo.users.filter(
          (user: any) => user.accountStatus === 'Blocked'
        );
        this.deletedUsers = respo.users.filter(
          (user: any) => user.accountStatus === 'Deleted'
        );
      },
    });
  }
}
