import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions: Boolean = true;
  @Input() cart: Cart;

  constructor(private _cartService: CartService) { }

  addToCart() {
    this._cartService.addToCart(this.product);
  }
}
