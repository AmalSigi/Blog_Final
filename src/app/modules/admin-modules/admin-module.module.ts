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

@NgModule({
  declarations: [
    NavbarComponent,
    AdminHomeComponent,
    AdminThemesComponent,
    AdminSettingsComponent,
    AdminComponent,
    AddPostComponent,
    AddPostSettingsComponent
    
  ],
  imports: [CommonModule, AdminRoutingModule,ReactiveFormsModule],
})
export class AdminModule {}
