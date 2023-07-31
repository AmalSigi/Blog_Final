import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { AdminComponent } from './root/admin.component';

import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { CategoryComponent } from './pages/admin-settings/pages/admin-category/category/category.component';
import { AddCategoryComponent } from './pages/admin-settings/pages/admin-category/add-category/add-category.component';
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/root/admin-tag.component';
import { SubCategoryComponent } from './pages/admin-settings/pages/admin-category/category/sub-category/sub-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AdminCommentsComponent } from './pages/admin-comments/root/admin-comments.component';
import { TagsComponent } from './pages/admin-settings/pages/admin-tag/page/tags/tags.component';
import { AddTagsComponent } from './pages/admin-settings/pages/admin-tag/page/add-tags/add-tags.component';
import { CommentsComponent } from './pages/admin-comments/page/comments/comments.component';
import { SpamCommentsComponent } from './pages/admin-comments/page/spam-comments/spam-comments.component';

import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostSettingsComponent } from './pages/admin-posts/pages/addPost/components/settings/addPostSettings.component';
import { AdminPostsComponent } from './pages/admin-posts/root/admin-posts.component';
import { PostDraftComponent } from './pages/admin-posts/pages/draft-posts/draft.component';
import { PostPublishedComponent } from './pages/admin-posts/pages/published-posts/published.component';
import { PostsTrashedComponent } from './pages/admin-posts/pages/trashed/trashed.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModelComponent } from 'src/app/shared/components/shared-model/shared-model.component';
import { PostFeaturesComponent } from './pages/admin-posts/pages/addPost/components/postFeatures/postFeatures.component';
import { DropdownComponent } from './pages/admin-posts/pages/addPost/components/postFeatures/components/dropDown/dropdown.component';
@NgModule({
  declarations: [
    NavbarComponent,
    AdminHomeComponent,
    AdminThemesComponent,
    AdminSettingsComponent,
    AdminComponent,
    AdminCategoryComponent,
    CategoryComponent,
    AddCategoryComponent,
    AdminTagComponent,
    SubCategoryComponent,
    TagsComponent,
    AddTagsComponent,
    CommentsComponent,
    SpamCommentsComponent,
    AddPostComponent,
    AddPostSettingsComponent,
    AdminPostsComponent,
    PostDraftComponent,
    PostPublishedComponent,
    PostsTrashedComponent,
    AdminProfileComponent,
    AdminCommentsComponent,
    PostFeaturesComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
