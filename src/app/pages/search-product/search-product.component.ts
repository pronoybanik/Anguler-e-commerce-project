import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../Data-Type/data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search-product.component.html',

})
export class SearchProductComponent {
  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  productQuery = this.activatedRoute.snapshot.params["query"];
  searchData: product[] = [];

  ngOnInit() {
    console.log(this.productQuery);
    this.productService.searchProduct(this.productQuery.toLowerCase()).subscribe((data) => {
      console.log("test", data);
      this.searchData = data as [];
    })
  }
}
