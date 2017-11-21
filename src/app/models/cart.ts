import { Product } from './product';
import { CartItem } from './cart-item';

export class Cart {
  public items: CartItem[] = [];

  constructor(public itemsMap: { [productId: string]: CartItem }) {
    this.itemsMap = itemsMap || {};

    // tslint:disable-next-line:forin
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      const x = new CartItem();
      Object.assign(x, item);
      x.key = productId;
      this.items.push(x);
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
