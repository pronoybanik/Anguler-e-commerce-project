import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitchCase, NgSwitch],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menuType: String = "default";
  router = inject(Router)
  sellName: string = "";


  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller_auth") && val.url.includes("seller")) {
          this.menuType = "seller"
          let sellerStore = localStorage.getItem('seller_auth');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellName = sellerData.name;

        } else {
          this.menuType = "default"
        }
      }
    })
  }

  handleLogOut() {
    localStorage.removeItem("seller_auth")
    this.router.navigateByUrl('')
  }

}
