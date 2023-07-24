import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './root/admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
<<<<<<< HEAD
import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { CategoryComponent } from './pages/admin-settings/pages/admin-category/category/category.component';
import { AddCategoryComponent } from './pages/admin-settings/pages/admin-category/add-category/add-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/root/admin-tag.component';
import { AdminCommentsComponent } from './pages/admin-comments/root/admin-comments.component';
import { AddTagsComponent } from './pages/admin-settings/pages/admin-tag/page/add-tags/add-tags.component';
import { TagsComponent } from './pages/admin-settings/pages/admin-tag/page/tags/tags.component';
import { CommentsComponent } from './pages/admin-comments/page/comments/comments.component';
import { SpamCommentsComponent } from './pages/admin-comments/page/spam-comments/spam-comments.component';
=======
import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';
>>>>>>> da96f0bca91d69e6447ca753a66624983bc2dae5

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'themes', component: AdminThemesComponent },
      { path: 'settings', component: AdminSettingsComponent },
<<<<<<< HEAD
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
          { path: 'comments', component: CommentsComponent },
          { path: 'spam-comments', component: SpamCommentsComponent },
        ],
      },
=======
>>>>>>> da96f0bca91d69e6447ca753a66624983bc2dae5
    ],
  },
  {path:'newPost',component:AddPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
