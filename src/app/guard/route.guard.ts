import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(private readonly router: Router, private readonly userService: UserService) {}

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

  private authorize(route: ActivatedRouteSnapshot, ): boolean {
    const loginCheck = this.userService.isLoggedIn();
    if (loginCheck) {
      const userRole = this.userService.getRole();
      if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        this.router.navigateByUrl('');
        return false;
      }
      return true;
    }
    this.redirect();
    return false;
  }
}
