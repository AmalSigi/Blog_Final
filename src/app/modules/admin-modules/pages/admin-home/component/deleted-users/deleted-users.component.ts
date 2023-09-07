import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { postsAPi } from 'src/app/core/http/post.service';
import { userApi } from 'src/app/core/http/userAccount.service';
import { OffsetService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-deleted-users',
  templateUrl: './deleted-users.component.html',
})
export class DeletedUsersComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: userApi,
    private readonly offsetValue: OffsetService,
    private readonly postService: postsAPi,
    private readonly toster: ToastrService
  ) {}
  users: any[] = [];

  selectedUserId!: number;
  selectedRoles: number[] = [];
  isModalOpen: boolean = false;

  public index!: number;
  public showEdit: boolean = false;
  public pageLength: number = 10;
  public totalData!: number;

  ngOnInit(): void {
    this.userInfo();
  }

  public userInfo() {
    const offset = this.offsetValue.offset();
    const status = 'Deleted';
    this.userService
      .getAllUsers(status, offset, this.offsetValue.pageSize)
      .subscribe((res: any) => {
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

  public closeModal() {
    this.isModalOpen = false;
  }

  public goProfile(id: number) {
    this.router.navigate(['admin/profile'], { queryParams: { id } });
  }

  public toggleUserStatus(userId: number, accountStatus: string) {
    this.userService.changeUserStatus(userId, accountStatus).subscribe(
      (res) => {
        this.toster.success(`user is ${accountStatus}`);
        this.userInfo();
      },
      (error) => {}
    );
  }

  public deleteUser(user: any) {
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
