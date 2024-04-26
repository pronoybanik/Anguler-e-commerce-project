import { CanActivateFn } from '@angular/router';
import { SellService } from './services/sell.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const sellService = inject(SellService); // Corrected the variable declaration
  if (localStorage.getItem("seller_auth")) {
    return true
  }
  return sellService.isUserLoggedIn.value; // Accessing the value property of BehaviorSubject
};
