import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkInterceptor } from '../interceptor/network.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ]
})
export class PagesModule { }
