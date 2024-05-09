import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignIn, SignUp } from '../../Data-Type/data-type';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
})
export class UserAuthComponent {
  userService = inject(UserService)
  showLogIn: boolean = true;
  authError: string = "";

  ngOnInit() {
    this.userService.userAuthReload();
  };

  signUp(data: SignUp) {
    this.userService.userSignUp(data)
  }

  login(data: SignIn) {

    this.userService.userLogIn(data)
    this.userService.isLoginError.subscribe((error: any) => {
      if (error) {
        this.authError = "User Email or password is not correct"
      }
    })

  }
  openLogIn() {
    this.showLogIn = false
  }

  openSignUp() {
    this.showLogIn = true
  }

}
