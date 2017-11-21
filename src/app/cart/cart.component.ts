import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart$;

  constructor(private _cartService: CartService) { }

  public async ngOnInit() {
    this.cart$ = await this._cartService.getCart();
  }

}
