import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import { Product } from '../../models/product';
import { AngularFireAction } from 'angularfire2/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private _productService: ProductService) {
    this.subscription = this._productService
      .getAll()
      .snapshotChanges()
      .map(actions => {
        const newActions = [];
        actions.forEach(action => {
          const key = action.key;
          const data = { key, ...action.payload.val() };
          newActions.push(data);
        });
        return newActions;
      })
      .subscribe((products: any[]) => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  public reloadItems(params) {
    if (!this.tableResource) {
      return;
    }

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  public filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
