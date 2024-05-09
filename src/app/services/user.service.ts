import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../Data-Type/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient);
  router = inject(Router);
  isLoginError = new EventEmitter<boolean>(false)
  userId = ''


  constructor() { }

  userSignUp(data: SignUp) {
    this.httpClient.post("http://localhost:3000/user",
      data,
      { observe: "response" }).subscribe(result => {
        if (result) {
          alert("User Register successfully")
          // this.isUserLoggedIn.next(true)
          localStorage.setItem("user_auth", JSON.stringify(result.body))
          this.router.navigateByUrl("/")
        }
      });
  }


  userLogIn(data: SignIn) {
    this.httpClient.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
      { observe: "response" }).subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.isLoginError.emit(false)

          this.userId = result.body[0].id;
          alert("Login successful")
          localStorage.setItem("user_auth", JSON.stringify(result.body[0]))
          this.router.navigateByUrl("/")
        } else {
          this.isLoginError.emit(true)
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem("user_auth")) {
      this.router.navigateByUrl("/")
    }
  }


}
