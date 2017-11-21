import { Subscription } from 'rxjs/Subscription';
import { CartService } from './../services/cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public category: string;
  public cart: any;
  private _subscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService
  ) {
    _productService
      .getAll()
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.val();
          const key = action.key;
          return { key, ...data };
        });
      })
      .switchMap((products: Product[]) => {
        this.products = products;
        return _route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });

  }

  async ngOnInit() {
    this._subscription = (await this._cartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
