import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { SignIn, SignUp } from '../Data-Type/data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor() { }

  sellerSignUp(data: SignUp) {
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

  sellerLogIn(data: SignIn) {
    this.httpClient.get(`http://localhost:3000/signUp?email=${data.email}&password=${data.password}`,
      { observe: "response" }).subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          alert("Login successful")
          this.isUserLoggedIn.next(true)
          localStorage.setItem("seller_auth", JSON.stringify(result.body))
          this.router.navigateByUrl("seller-home")
        } else {
          this.isLoginError.emit(true)
        }
      });
  }

}
