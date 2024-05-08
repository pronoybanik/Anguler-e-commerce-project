import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../../Data-Type/data-type';


@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
})
export class UserAuthComponent {

  signUp(data: SignUp) {
    console.log(data);
  }

}
