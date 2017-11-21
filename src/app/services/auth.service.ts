import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(
    private _userService: UserService,
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute) {
    this.user$ = _afAuth.authState;
  }

  public login() {
    const redirect = this._route.snapshot.queryParamMap.get('redirect') || '/';
    localStorage.setItem('redirect', redirect);

    this._afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  public logout() {
    this._afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this._userService.get(user.uid);
        }

        return Observable.of(null);
      });
  }

}
