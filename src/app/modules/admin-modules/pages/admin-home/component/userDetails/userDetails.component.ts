import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-user',
  templateUrl: './userDetails.component.html',
})
export class UsersDetailsComponents {
  constructor(
    private readonly httpClient: HttpClient,
    private router: Router,
    private readonly userService: userApi,
    private offsetValue: OffsetService,
    private postService: postsAPi
  ) {}
  users: any[] = [];
  roles: any[] = [];
  selectedUserId!: number;
  selectedRoles: number[] = [];
  isModalOpen: boolean = false;
  newPassword: string = '';
  public index!: number;
  public showEdit: boolean = false;
  public pageLength: number = 10;
  public totalData!: number;
  isResetPasswordModelOpen: boolean = false;
  ngOnInit(): void {
    this.userInfo();
    this.fetchRoles();
  }
  public openResetPassword(userId: number) {
    this.selectedUserId = userId;
    this.isResetPasswordModelOpen = true;
    this.newPassword = '';
  }
  public closePasswordModal() {
    this.isResetPasswordModelOpen = false;
  }
  public userInfo() {
    const offset = this.offsetValue.offset();
    this.userService
      .getAllUsers(offset, this.offsetValue.pageSize)
      .subscribe((res: any) => {
        this.totalData = res.totalLength;
        const activeUsers = res.users.filter(
          (user: any) => user.accountStatus !== 'Deleted'
        );
        this.users = activeUsers.map((user: any) => ({
          ...user,
          userPosts: [],
        }));
        this.users.forEach((user) => {
          this.postService
            .authorizedPosts(user.id)
            .subscribe((userPosts: any[]) => {
              user.userPosts = userPosts;
              console.log(this.users);
            });
        });
      });
  }

  public fetchRoles() {
    this.userService.userRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }
  openModal(userId: number) {
    this.selectedUserId = userId;
    this.isModalOpen = true;
    const user = this.users.find((u) => u.id === userId);

    if (user) {
      this.selectedRoles = user.userRoles.map((role: any) => role.role.id);
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
  toggleRole(roleId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRoles.push(roleId);
    } else {
      const index = this.selectedRoles.indexOf(roleId);
      if (index !== -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
  }

  isSelected(roleId: number): boolean {
    return this.selectedRoles.includes(roleId);
  }
  public addRolesToUser() {
    if (this.selectedUserId === null) {
      return;
    }

    const postData = {
      roles: this.selectedRoles.map((roleId) => {
        const role = this.roles.find((r) => r.id === roleId);
        return { roleId: roleId, _RoleName: role ? role.roleName : '' };
      }),
    };
    this.userService
      .updateRoles(this.selectedUserId, postData.roles)

      .subscribe(
        (res) => {
          this.userInfo();
          this.isModalOpen = false;
        },
        (error) => {}
      );
  }
  public resetPassword() {
    if (this.selectedUserId === null) {
    }
    const postData = {
      newPassword: this.newPassword,
    };
    this.userService.resetpassword(this.selectedUserId, postData).subscribe(
      (res) => {
        this.userInfo();
        this.isResetPasswordModelOpen = false;
      },
      (error) => {}
    );
  }

  public goProfile(id: number) {
    this.router.navigate(['/profile'], { queryParams: { id } });
  }

  public toggleUserStatus(userId: number, accountStatus: string) {
    const newStatus = accountStatus === 'Active' ? 'Blocked' : 'Active';
    const apiUrl = newStatus === 'Active' ? 'reActivate' : 'block';
    this.userService.changeUserStatus(userId, apiUrl).subscribe(
      (res) => {
        this.userInfo();
      },
      (error) => {}
    );
  }

  public deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (res) => {
          this.userInfo();
        },
        (err) => {
          alert('error');
        }
      );
    }
  }
  public toggleEdit(index: number): void {
    if (this.index === index) {
      this.index = -1;
      this.showEdit = !this.showEdit;
    } else {
      this.showEdit = true;
      this.index = index;
    }
  }
  public emitPages() {
    this.userInfo();
  }
}
