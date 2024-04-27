import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerPageComponent } from './pages/seller-page/seller-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './pages/seller-product-list/seller-product-list.component';

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
    {
        path: 'seller-addProduct',
        component: SellerAddProductComponent,
        canActivate: [authGuard]
    },
    {
        path: 'seller-productList',
        component: SellerProductListComponent,
        canActivate: [authGuard]
    },
];
