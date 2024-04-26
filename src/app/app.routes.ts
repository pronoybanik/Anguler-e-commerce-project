import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerPageComponent } from './pages/seller-page/seller-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'signUp',
        component: SignupComponent
    },
    {
        path: 'seller-home',
        component: SellerPageComponent,
        canActivate: [authGuard]
    },
];
