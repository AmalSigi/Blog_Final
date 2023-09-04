import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
})
export class BlockedUsersComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: userApi,
    private readonly offsetValue: OffsetService,
    private readonly postService: postsAPi,
    private readonly toster: ToastrService
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
  }

  public userInfo() {
    const offset = this.offsetValue.offset();
    const status = 'Blocked';
    this.userService
      .getAllUsers(status, offset, this.offsetValue.pageSize)
      .subscribe((res: any) => {
        console.log(res);
        this.totalData = res.totalLength;

        this.users = res.users;
        this.users.forEach((user) => {
          this.postService
            .authorizedPosts(user.id)
            .subscribe((userPosts: any[]) => {
              user.userPosts = userPosts;
            });
        });
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

  public goProfile(id: number) {
    this.router.navigate(['admin/profile'], { queryParams: { id } });
  }

  public toggleUserStatus(userId: number, accountStatus: string) {
    const newStatus = accountStatus === 'Active' ? 'Blocked' : 'Active';
    const apiUrl = newStatus === 'Active' ? 'reActivate' : 'block';
    this.userService.changeUserStatus(userId, apiUrl).subscribe(
      (res) => {
        this.toster.success(`user is ${newStatus}`);
        this.userInfo();
      },
      (error) => {}
    );
  }

  public deleteUser(user: any) {
    console.log(user);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(
        (res) => {
          this.toster.warning(`${user.firstName} ${user.lastName} Deleted`);
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
