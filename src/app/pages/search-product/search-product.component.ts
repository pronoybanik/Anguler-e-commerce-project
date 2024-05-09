import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../Data-Type/data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './search-product.component.html',

})
export class SearchProductComponent {
  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  productQuery = this.activatedRoute.snapshot.params["query"];
  searchData: product[] = [];
  router = inject(Router);

  ngOnInit() {
    this.productService.searchProduct(this.productQuery.toLowerCase()).subscribe((data: any) => {
      if (data.length) {
        this.searchData = data as [];
      } else {
        alert("No product Found")
        this.router.navigateByUrl("")
      }
    })
  }
}
