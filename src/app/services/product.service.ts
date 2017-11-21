import { Product } from './../models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private _db: AngularFireDatabase) { }

  public create(product) {
    return this._db.list('/products').push(product);
  }

  public getAll() {
    return this._db
      .list('/products');
  }

  public get(productId) {
    return this._db
      .object('/products/' + productId)
      .snapshotChanges()
      .map(action => {
        const key = action.payload.key;
        const data = { key, ...action.payload.val() };
        return data;
      });
  }

  public update(productId, product) {
    return this._db
      .object('/products/' + productId)
      .update(product);
  }

  public delete(productId) {
    return this._db
      .object('/products/' + productId)
      .remove();
  }

}
