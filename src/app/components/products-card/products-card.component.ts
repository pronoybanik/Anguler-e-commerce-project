import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../Data-Type/data-type';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './products-card.component.html',
})
export class ProductsCardComponent {
  productsService = inject(ProductService);
  productData: undefined | product[];

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.productData = data;
    })
  }
}
