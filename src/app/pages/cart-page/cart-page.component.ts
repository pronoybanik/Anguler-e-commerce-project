import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { cart, priceSummary } from '../../Data-Type/data-type';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {
  productService = inject(ProductService);
  cartData: undefined | cart[];
  router = inject(Router);

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  ngOnInit() {
    this.loadData()
  };

  removeToCart(id: string | undefined) {
    id && this.productService.removeToCart(id)
      .subscribe((result) => {
        result && this.loadData();
      })
  };

  loadData() {
    this.productService.currentCart().subscribe((result) => {
      if (result) {
        this.cartData = result;
        let price = 0
        result.forEach((item) => {
          if (item.quantity) {
            price = price + (+ item.price * + item.quantity)
          }
        });
        this.priceSummary.price = price;
        this.priceSummary.discount = price / 10;
        this.priceSummary.tax = price / 5;
        this.priceSummary.delivery = 100;
        this.priceSummary.total = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;

        if (!this.cartData.length) {
          this.router.navigate(["/"])
        }
      }
    })
  };
  
}
