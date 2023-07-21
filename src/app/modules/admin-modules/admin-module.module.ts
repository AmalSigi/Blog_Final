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
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/admin-tag.component';
import { SubCategoryComponent } from './pages/admin-settings/pages/admin-category/category/sub-category/sub-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCommentsComponent } from './pages/admin-comments/admin-comments.component';

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
    AdminProfileComponent,
    AdminCommentsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
