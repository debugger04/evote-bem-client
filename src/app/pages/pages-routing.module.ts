import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from '../guard/route.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'committee/login',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
