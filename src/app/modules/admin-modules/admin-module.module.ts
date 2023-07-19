import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminThemesComponent } from './pages/admin-themes/admin-themes.component';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';

@NgModule({
  declarations: [NavbarComponent, AdminHomeComponent, AdminThemesComponent, AdminSettingsComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
