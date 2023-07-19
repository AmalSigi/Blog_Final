import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from '../user-modules/pages/home/home.component';
import { AdminHomeComponent } from './pages/home/admin-home.component';

@NgModule({
  declarations: [NavbarComponent,AdminHomeComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
