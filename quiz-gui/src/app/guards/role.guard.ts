import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../services/user.service"


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(protected roles: Array<string>, protected router: Router, protected userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.userService.user.toPromise()
      .then(user => {
        if (this.roles.includes(user.role)) {
          return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: route.routeConfig.path }});
        return false;
      }).catch(err => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: route.routeConfig.path }});
        return false;
      });
    }
}
