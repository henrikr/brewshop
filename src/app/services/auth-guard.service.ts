import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this._auth.user$.map(user => {
      if (user) {
        return true;
      }

      this._router.navigate(['/login'], { queryParams: { redirect: state.url } });
      return false;
    });
  }

}
