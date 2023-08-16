import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { UsersDetailsComponents } from './pages/admin-home/component/userDetails/userDetails.component';
import { UserPostsComponent } from './pages/admin-home/component/userDetails/pages/userPostList/userPostList.component';
import { RegisterComponent } from './pages/admin-home/component/userDetails/pages/userRegister/userRegister.component';
import { ReportedCommnentViewComponent } from './pages/admin-comments/page/spam-comments/reported-commnent-view/reported-commnent-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersDetailsComponents,
        children: [{ path: 'register', component: RegisterComponent }],
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
