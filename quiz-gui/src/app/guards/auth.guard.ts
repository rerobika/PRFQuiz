import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { UserService } from "../services/user.service"

@Injectable({ providedIn: 'root' })
export class AuthGuard extends RoleGuard {

    constructor(protected router: Router, protected userService: UserService) {
      super (["admin", "player"], router, userService);
    }

}
