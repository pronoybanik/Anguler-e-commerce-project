import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignUp } from '../Data-Type/data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  userSignUp(data: SignUp) {
    this.httpClient.post("http://localhost:3000/signUp",
      data,
      { observe: "response" }).subscribe(result => {
        if (result) {
          alert("User Register successfully")
          this.isUserLoggedIn.next(true)
          localStorage.setItem("seller_auth", JSON.stringify(result.body))
          this.router.navigateByUrl("seller-home")
        }
      });
  }

  reLoadSeller() {
    if (localStorage.getItem("seller_auth")) {
      this.isUserLoggedIn.next(true)
      this.router.navigateByUrl("seller-home")
    }
  }

}
