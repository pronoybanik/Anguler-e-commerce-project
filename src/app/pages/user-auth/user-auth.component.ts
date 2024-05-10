import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignIn, SignUp, cart, product } from '../../Data-Type/data-type';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
})
export class UserAuthComponent {
  userService = inject(UserService);
  productService = inject(ProductService);
  showLogIn: boolean = true;
  authError: string = "";

  ngOnInit() {
    this.userService.userAuthReload();
  };

  signUp(data: SignUp) {
    this.userService.userSignUp(data)
  };

  login(data: SignIn) {
    this.userService.userLogIn(data)
    this.userService.isLoginError.subscribe((error: any) => {
      if (error) {
        this.authError = "User Email or password is not correct"
      } else {
        this.localCartToRemoteCart()
      }
    })
  };

  openLogIn() {
    this.showLogIn = false
  };

  openSignUp() {
    this.showLogIn = true
  };

  localCartToRemoteCart() {
    let data = localStorage.getItem("productData");
    setTimeout(() => {
      if (data) {
        let cartDataList: product[] = JSON.parse(data)
        let userId = this.userService.userId

        cartDataList.forEach((product: product, index) => {
          let cartData: cart = {
            ...product,
            productId: product.id,
            userId
          };
          delete cartData.id;

          this.productService.addToCart(cartData).subscribe((data) => {
            if (data) {
              console.log("store db", data);
            }
            if (cartDataList?.length === index + 1) {
              localStorage.removeItem("productData")
            }
          })
        })
      }
      
      this.productService.getCarList(this.userService.userId)
    }, 2000);

   
  }

}
