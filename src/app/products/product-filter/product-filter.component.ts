import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  public categories$;
  @Input() category;

  constructor(private _categoryService: CategoryService) {
    this.categories$ = _categoryService.getAll();
  }

  ngOnInit() {
  }

}
