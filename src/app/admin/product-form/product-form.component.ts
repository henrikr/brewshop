import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  public product = {};
  protected id;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _productService: ProductService) {

    this.categories$ = _categoryService.getAll();

    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._productService
        .get(this.id)
        .take(1)
        .subscribe(p => this.product = p);
    }
  }

  save(product) {
    if (this.id) {
      this._productService.update(this.id, product);
    } else {
      this._productService.create(product);
    }

    this._router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this._productService.delete(this.id);
    this._router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
