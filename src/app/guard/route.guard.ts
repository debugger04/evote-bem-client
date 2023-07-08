import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authorize(route);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize(childRoute);
  }
  
  private redirect(): void {
    this.router.navigate(['login']).finally();
  }

  private authorize(state: ActivatedRouteSnapshot): boolean {
    const authToken: boolean = sessionStorage.getItem('token') !== null;
    if (!authToken) {
      this.redirect();
      return false;
    } else {
      return true;
    }
  }
}
