import { CartService } from './../services/cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() cart;

  constructor(private _cartService: CartService) { }

  addToCart() {
    this._cartService.addToCart(this.product);
  }

  removeFromCart() {
    this._cartService.removeFromCart(this.product);
  }
}
