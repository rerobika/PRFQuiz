import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from '../services/cookie.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(protected roles: Array<string>, protected router: Router, protected cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.roles.includes(this.cookieService.getCookie('user.role'))) {
        return true;
      }

      console.log ("BACK to login");
      this.router.navigate(['/login'], { queryParams: { returnUrl: route.routeConfig.path }});
      return false;
    }
}
