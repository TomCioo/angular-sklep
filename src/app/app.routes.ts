import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home').then(m => m.Home)
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product-page/product-page').then(m => m.ProductPage)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart').then(m => m.Cart)
  },

  {
    path: 'payment',
    loadComponent: () =>
      import('./payment/payment').then(m => m.Payment)
  },

  {
    path: 'summary',
    loadComponent: () =>
      import('./summary/summary').then(m => m.Summary)
  },

  {
    path: '**',
    redirectTo: ''
  }
];