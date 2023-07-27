import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { AdminComponent } from './root/admin.component';
import { AddPostComponent } from './pages/admin-posts/pages/addPost/addPost.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostSettingsComponent } from './pages/admin-posts/pages/addPost/components/settings/addPostSettings.component';
import { AdminPostsComponent } from './pages/admin-posts/root/admin-posts.component';
import { PostDraftComponent } from './pages/admin-posts/pages/draft-posts/draft.component';
import { PostPublishedComponent } from './pages/admin-posts/pages/published-posts/published.component';
import { PostsTrashedComponent } from './pages/admin-posts/pages/trashed/trashed.component';
import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AdminCommentsComponent } from './pages/admin-comments/admin-comments.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AdminHomeComponent,
    AdminThemesComponent,
    AdminSettingsComponent,
    AdminComponent,
    AddPostComponent,
    AddPostSettingsComponent,
    AdminPostsComponent,
    PostDraftComponent,
    PostPublishedComponent,
    PostsTrashedComponent,
    AdminCategoryComponent,
    AdminProfileComponent,
    AdminCommentsComponent
    
  ],
  imports: [CommonModule, AdminRoutingModule,ReactiveFormsModule],
})
export class AdminModule {}
