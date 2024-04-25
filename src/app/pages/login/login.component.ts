import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellService } from '../../services/sell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  sellService = inject(SellService)
  router = inject(Router)

  loginInfo: any = {
    userName: "",
    email: "",
    password: ""
  }

  loginForm() {
   this.sellService.addUser(this.loginInfo).subscribe(result => {
    alert("Login successfully")
    this.router.navigateByUrl("seller")

   }) 
  }
}
