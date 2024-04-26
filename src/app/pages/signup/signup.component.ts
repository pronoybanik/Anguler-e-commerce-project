import { Component, inject } from '@angular/core';
import { SignIn, SignUp } from '../../Data-Type/data-type';
import { SellService } from '../../services/sell.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',

})
export class SignupComponent {
  sellerService = inject(SellService);
  router = inject(Router);
  showLogin = false;
  authError: string = "";

  signUpInfo: SignUp = {
    name: "",
    email: "",
    password: ""
  }

  logInInfo: SignIn = {
    email: "",
    password: ""
  }

  ngOnInit(): void {
    this.sellerService.reLoadSeller()
  }

  handleLogin() {
    this.sellerService.sellerLogIn(this.logInInfo)
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct"
      }
    })
  }

  handlerSignUp() {
    this.sellerService.sellerSignUp(this.signUpInfo)
  }
  openLogIn() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

}
