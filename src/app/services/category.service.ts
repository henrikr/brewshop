import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private _db: AngularFireDatabase) { }

  public getAll() {
    return this._db
      .list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.val();
          const key = action.key;
          return { key, ...data };
        });
      });
  }
}
