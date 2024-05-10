import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerPageComponent } from './pages/seller-page/seller-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './pages/seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './pages/seller-product-list/seller-product-list.component';
import { SellerUpdateProductComponent } from './pages/seller-update-product/seller-update-product.component';
import { SearchProductComponent } from './pages/search-product/search-product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

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
    {
        path: 'seller-update-productList/:id',
        component: SellerUpdateProductComponent,
        canActivate: [authGuard]
    },
    {
        path: 'search-product/:query',
        component: SearchProductComponent,
    },
    {
        path: 'productDetails/:id',
        component: ProductDetailsComponent,
    },
    {
        path: 'user-auth',
        component: UserAuthComponent,
    },
    {
        path: 'cart-page',
        component: CartPageComponent,
    },
];
