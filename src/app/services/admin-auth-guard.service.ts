import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this._auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
