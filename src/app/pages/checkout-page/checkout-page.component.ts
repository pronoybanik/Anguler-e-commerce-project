import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { cart, order } from '../../Data-Type/data-type';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent {
  productService = inject(ProductService);
  router = inject(Router);
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;

  ngOnInit() {
    this.productService.currentCart().subscribe((result) => {
      if (result) {
        let price = 0;
        this.cartData = result;

        result.forEach((item) => {
          if (item.quantity) {
            price = price + (+ item.price * + item.quantity)
          }
        });
        this.totalPrice = price - (price / 10) + (price / 5) + 100

      }
    })
  }

  orderHandle(data: any) {
    let user = localStorage.getItem("user_auth")
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice && userId) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item?.id && this.productService.deleteCartItem(item.id)
        }, 1000);
      })

      this.productService.orderSave(orderData).subscribe((result) => {
        this.orderMessage = "Your order Has been placed"

        setTimeout(() => {
          this.router.navigate(["/myOrder"])
          this.orderMessage = undefined;
        }, 4000);

      })
    }

  }
}
