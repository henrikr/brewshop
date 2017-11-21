import { Product } from './product';

export class CartItem {
  key: string;
  title: string;
  image: string;
  price: number;
  quantity: number;

  constructor() {}

  get totalPrice() {
    return this.price * this.quantity;
  }
}
