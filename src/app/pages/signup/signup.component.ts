import { Component, inject } from '@angular/core';
import { SignUp } from '../../Data-Type/data-type';
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
  sellerService = inject(SellService)
  router = inject(Router)
  showLogin = false

  signUpInfo: SignUp = {
    name: "",
    email: "",
    password: ""
  }
  ngOnInit(): void {
    this.sellerService.reLoadSeller()
  }

  handlerSignUp() {
    this.sellerService.userSignUp(this.signUpInfo)
  }
  openLogIn() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

}
