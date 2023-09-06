import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { CommentsComponent } from './pages/admin-comments/page/comments/comments.component';
import { SpamCommentsComponent } from './pages/admin-comments/page/spam-comments/spam-comments.component';
import { AdminCommentsComponent } from './pages/admin-comments/root/admin-comments.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AddCategoryComponent } from './pages/admin-settings/pages/admin-category/add-category/add-category.component';
import { CategoryComponent } from './pages/admin-settings/pages/admin-category/category/category.component';
import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AddTagsComponent } from './pages/admin-settings/pages/admin-tag/page/add-tags/add-tags.component';
import { TagsComponent } from './pages/admin-settings/pages/admin-tag/page/tags/tags.component';
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/root/admin-tag.component';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { AdminComponent } from './root/admin.component';

import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';
import { PostDraftComponent } from './pages/admin-posts/pages/draft-posts/draft.component';
import { PostPublishedComponent } from './pages/admin-posts/pages/published-posts/published.component';
import { PostsTrashedComponent } from './pages/admin-posts/pages/trashed/trashed.component';
import { AdminPostsComponent } from './pages/admin-posts/root/admin-posts.component';
import { UsersDetailsComponents } from './pages/admin-home/component/userDetails/root/userDetails.component';
import { UserPostsComponent } from './pages/admin-home/component/userDetails/pages/userPostList/userPostList.component';
import { RegisterComponent } from './pages/admin-home/component/userDetails/pages/userRegister/userRegister.component';
import { ReportedCommnentViewComponent } from './pages/admin-comments/page/spam-comments/reported-commnent-view/reported-commnent-view.component';
import { EditorsPickComponent } from './pages/admin-posts/pages/editorsPick/editorsPick.component';
import { loginQuards } from 'src/app/core/quards/login.quard';
import { AdminSiteSettingComponent } from './pages/admin-settings/pages/admin-site-setting/root/admin-site-setting.component';
import { AdminBlogSettingComponent } from './pages/admin-settings/pages/admin-site-setting/admin-blog-setting/admin-blog-setting.component';
import { UncategorizedComponent } from './pages/admin-posts/pages/uncategorized/uncategorized.component';
import { AdminSocialMediaSettingComponent } from './pages/admin-settings/pages/admin-site-setting/admin-social-media-setting/admin-social-media-setting.component';
import { AdminMessagesComponent } from './pages/admin-messages/root/admin-messages.component';
import { AllMessagesComponent } from './pages/admin-messages/page/all-messages/all-messages.component';
import { ReadMeassageComponent } from './pages/admin-messages/page/read-meassage/read-meassage.component';
import { UnreadMeassageComponent } from './pages/admin-messages/page/unread-meassage/unread-meassage.component';
import { ActiveUsersComponent } from './pages/admin-home/component/active-users/active-users.component';
import { BlockedUsersComponent } from './pages/admin-home/component/blocked-users/blocked-users.component';
import { DeletedUsersComponent } from './pages/admin-home/component/deleted-users/deleted-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: mapToCanActivate([loginQuards]),
    canActivateChild: mapToCanActivate([loginQuards]),
    children: [
      {
        path: 'users',
        component: UsersDetailsComponents,
        children: [
          { path: 'register', component: RegisterComponent },
          { path: 'active-users', component: ActiveUsersComponent },
          { path: 'blocked-users', component: BlockedUsersComponent },
          { path: 'deleted-users', component: DeletedUsersComponent },
        ],
      },
      { path: 'userPosts', component: UserPostsComponent },

      {
        path: 'posts',
        component: AdminPostsComponent,
        children: [
          { path: '', component: PostPublishedComponent, pathMatch: 'full' },

          { path: 'published', component: PostPublishedComponent },
          { path: 'drafts', component: PostDraftComponent },
          { path: 'trashed', component: PostsTrashedComponent },
          { path: 'Editor-pick', component: EditorsPickComponent },
          { path: 'Uncategorized-post', component: UncategorizedComponent },
        ],
      },
      { path: '', component: AdminHomeComponent },
      { path: 'themes', component: AdminThemesComponent },
      { path: 'settings', component: AdminSettingsComponent },
      {
        path: 'admin-category',
        component: AdminCategoryComponent,
        children: [
          { path: '', component: CategoryComponent },
          { path: 'category', component: CategoryComponent },
          { path: 'add-category', component: AddCategoryComponent },
        ],
      },

      { path: 'profile', component: AdminProfileComponent },
      {
        path: 'admin-tags',
        component: AdminTagComponent,
        children: [
          { path: '', component: TagsComponent },
          { path: 'tags', component: TagsComponent },
          { path: 'add-tags', component: AddTagsComponent },
        ],
      },
      {
        path: 'admin-site-setting',
        component: AdminSiteSettingComponent,
        children: [
          { path: 'admin-blog-setting', component: AdminBlogSettingComponent },
          {
            path: 'admin-soical-media-setting',
            component: AdminSocialMediaSettingComponent,
          },
        ],
      },
      {
        path: 'admin-messages',
        component: AdminMessagesComponent,
        children: [
          { path: 'admin-all-messages', component: AllMessagesComponent },

          { path: 'admin-read-messages', component: ReadMeassageComponent },
          { path: 'admin-unread-messages', component: UnreadMeassageComponent },
        ],
      },
      {
        path: 'admin-comments',
        component: AdminCommentsComponent,
        children: [
          { path: '', component: CommentsComponent },
          { path: 'comments', component: CommentsComponent },
          {
            path: 'spam-comments',
            component: SpamCommentsComponent,
            children: [
              {
                path: 'reported-comment-view',
                component: ReportedCommnentViewComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: 'newPost', component: AddPostComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
