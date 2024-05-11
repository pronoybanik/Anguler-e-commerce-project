import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { order } from '../../Data-Type/data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-myorder',
  standalone: true,
  imports: [NgFor],
  templateUrl: './myorder.component.html'
})
export class MyorderComponent {

  productService = inject(ProductService);
  orderData: order[] | undefined;

  ngOnInit() {
    this.getOrderList()
  };

  cancelOrder(orderId: string | undefined) {
    orderId && this.productService.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.getOrderList()
      }
    })
  };

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      if (result.length) {
        this.orderData = result;
      }
    })
  }
}
