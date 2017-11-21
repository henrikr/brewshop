import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Injectable()
export class UserService {

  constructor(private _db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this._db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this._db.object('/users/' + uid).valueChanges();
  }

}
