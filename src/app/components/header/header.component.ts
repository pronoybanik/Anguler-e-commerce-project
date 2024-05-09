import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitchCase, NgSwitch, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  productService = inject(ProductService)
  menuType: String = "default";
  router = inject(Router)
  sellName: string = "";
  userName: string = "";
  searchValue: string = "";
  cartItem = 0;

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller_auth") && val.url.includes("seller")) {
          this.menuType = "seller"
          let sellerStore = localStorage.getItem('seller_auth');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellName = sellerData.name;

        } else if (localStorage.getItem("user_auth")) {
          this.menuType = "user"
          let userStore = localStorage.getItem('user_auth');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
        } else {
          this.menuType = "default";
        }
      }
    })

    let localData = localStorage.getItem("productData")
    if (localData) {
      this.cartItem = JSON.parse(localData).length
    }
    // set a live counting system for navbar cart
    this.productService.cartIndex.subscribe((item) => {
      this.cartItem = item.length;
    })
  }

  handleLogOut() {
    localStorage.removeItem("seller_auth")
    localStorage.removeItem("user_auth")
    this.router.navigateByUrl('')
  }

  inputChange(event: any) {
    this.searchValue = event.target.value
  }

  onSearch() {
    if (this.searchValue.length) {
      const url: string = `search-product/${this.searchValue.toLowerCase()}`;
      this.router.navigateByUrl(url)
    } 
  }
}
