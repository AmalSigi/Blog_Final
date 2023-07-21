import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './root/admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminSettingsComponent } from './pages/admin-settings/root/admin-settings.component';
import { AdminCategoryComponent } from './pages/admin-settings/pages/admin-category/root/admin-category.component';
import { CategoryComponent } from './pages/admin-settings/pages/admin-category/category/category.component';
import { AddCategoryComponent } from './pages/admin-settings/pages/admin-category/add-category/add-category.component';
import { AdminProfileComponent } from './pages/admin-settings/pages/admin-profile/admin-profile.component';
import { AdminTagComponent } from './pages/admin-settings/pages/admin-tag/admin-tag.component';
import { AdminCommentsComponent } from './pages/admin-comments/admin-comments.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
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
      { path: 'tags', component: AdminTagComponent },
      { path: 'comments', component: AdminCommentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
