import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { RoleGuard } from './role.guard';

@Injectable({ providedIn: 'root' })
export class AdminGuard extends RoleGuard {

  constructor(protected router: Router, protected cookieService: CookieService) {
    super (["admin"], router, cookieService);
  }
}
