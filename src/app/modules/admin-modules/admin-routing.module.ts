import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './root/admin.component';
import { AdminHomeComponent } from './pages/home/admin-home.component';

const routes: Routes = [{path:'',component: AdminComponent,
children:[
  {path:'',component:AdminHomeComponent}
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
