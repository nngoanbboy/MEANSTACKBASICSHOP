import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/homepage/homepage.component'),
  },
  {
    path: 'admin-list',
    loadComponent: () => import('./pages/admin-list/admin-list.component'),
  },
  {
    path: 'product-detail',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component'),
  },
  {
    path: 'product-detail/:id', // Đảm bảo bạn có '/:id' ở đây
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component'),
  },
];
