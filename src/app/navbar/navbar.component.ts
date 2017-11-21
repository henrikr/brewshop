import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: AppUser;
  public cart$: Observable<Cart>;

  constructor(
    private _auth: AuthService,
    private _cart: CartService
  ) {}

  async ngOnInit() {
    this._auth.appUser$.subscribe(user => this.user = user);

    this.cart$ = await this._cart.getCart();
  }

  logout() {
    this._auth.logout();
  }

}
