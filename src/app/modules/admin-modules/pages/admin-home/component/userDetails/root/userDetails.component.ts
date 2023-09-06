import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

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
        console.log(this.activeUsers);
        console.log(this.blockedUsers);
        console.log(this.deletedUsers);
      },
    });
  }
}
