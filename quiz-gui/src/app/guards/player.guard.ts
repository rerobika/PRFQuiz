import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { RoleGuard } from './role.guard';

@Injectable({ providedIn: 'root' })
export class PlayerGuard extends RoleGuard {

    constructor(protected router: Router, protected cookieService: CookieService) {
      super (["player"], router, cookieService);
    }

}
