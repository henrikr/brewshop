import { Observable } from 'rxjs/Observable';
import { Cart } from './../models/cart';
import { Product } from './../models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService {

  constructor(private _db: AngularFireDatabase) { }

  private create() {
    return this._db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  public async getCart(): Promise<Observable<Cart>> {
    const cartId = await this.getOrCreateCartId();
    return this._db.object('/carts/' + cartId)
      .snapshotChanges()
      .map(action => {
        const data = action.payload.val();
        const key = action.key;
        return { key, ...data };
      })
      .map((x) => new Cart(x.items));
  }

  /*
   * Using async / await instead of promises here we have a more 'linear'
   * flow in the logic of the code, which improves readability.
   *
   * Previously:
   *   this
   *     .create()
   *     .then(result => ... return result.key);
   *
   * Now:
   *   result = await this.create();
   *   return result.key
   */
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this._db.object('/carts/' + cartId + '/items/' + productId);
  }

  public async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  public async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .take(1)
      .map(action => {
        const data = action.payload.val();
        const exists = action.payload.exists();
        return { exists, ...data };
      })
      .subscribe(item => {
        if (item.exists)
          item$.update({ quantity: item.quantity + change });
        else
          item$.set({
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: change
          });

        // alternative 'cleaner' code
        // item$.update({ product: product, quantity: (item.quantity || 0) + change });
      });
  }

}
