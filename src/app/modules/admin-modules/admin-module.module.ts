import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminHomeComponent } from './pages/home/admin-home.component';
import { AdminComponent } from './root/admin.component';

@NgModule({
  declarations: [NavbarComponent, AdminHomeComponent,AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
