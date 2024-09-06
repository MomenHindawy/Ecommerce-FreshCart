import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/Guards/auth.guard';
import { backGuard } from './core/Guards/back.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [

    {
        path: (''), component: AuthLayoutComponent, canActivate: [backGuard], children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: ('login'), component: LoginComponent },
            { path: ('register'), loadComponent: () => import('./components/register/register.component').then((c) => c.RegisterComponent) },
            { path: ('forgot'), loadComponent: () => import('./components/forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent) },
        ]
    },
    {
        path: (''), component: BlankLayoutComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'product', loadComponent: () => import('./components/product/product.component').then((c) => c.ProductComponent) },
            { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then((c) => c.CartComponent) },
            { path: 'category', loadComponent: () => import('./components/categories/categories.component').then((c) => c.CategoriesComponent) },
            { path: 'detailsCat/:id', loadComponent: () => import('./components/details-cat/details-cat.component').then((c) => c.DetailsCatComponent) },
            { path: 'brand', loadComponent: () => import('./components/brands/brands.component').then((c) => c.BrandsComponent) },
            { path: 'detbrand/:id', loadComponent: () => import('./components/det-brand/det-brand.component').then((c) => c.DetBrandComponent) },
            { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then((c) => c.DetailsComponent) },
            { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then((c) => c.AllordersComponent) },
            { path: 'order/:id', loadComponent: () => import('./components/order/order.component').then((c) => c.OrderComponent) },
            { path: 'wishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then((c) => c.WishlistComponent) },
        ]
    },
    { path: ('**'), loadComponent: () => import('./components/not-found/not-found.component').then((c) => c.NotFoundComponent) },
];
