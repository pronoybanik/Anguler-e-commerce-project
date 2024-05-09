import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../../Data-Type/data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {

  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  productId = this.activatedRoute.snapshot.params["id"];
  productData: undefined | product;
  quantityNumber = 1;
  removeCart = false;

  ngOnInit() {
    this.productId && this.productService.getProductsById(this.productId).subscribe((result) => {
      if (result) {
        this.productData = result;

        let cartData = localStorage.getItem("productData")
        if (this.productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((items: product) => this.productId === items.id)
          if (items.length) {
            this.removeCart = true
          } else {
            this.removeCart = false
          }

        }
      }
    })
  }

  handleQuantity(value: string) {
    if (this.quantityNumber < 10 && value === "plus") {
      this.quantityNumber += 1
    } else if (this.quantityNumber > 1 && value === "minus") {
      this.quantityNumber -= 1
    }
  };

  AddProduct() {
    if (this.productData) {
      this.productData.quantity = this.quantityNumber;
      if (!localStorage.getItem("user_auth")) {
        this.productService.localStorageData(this.productData);
        this.removeCart = true
      } else {
        let user = localStorage.getItem("user_auth")
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert("Product is added in Cart")
          }
        })
      }
    }
  };

  removeToCart() {
    this.productService.removeItemFormCart(this.productId)
    this.removeCart = false
  };

}
