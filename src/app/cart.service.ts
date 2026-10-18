import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];

  addProduct(product: any) {
    const existing = this.cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1
      });
    }
  }

  increaseProduct(product: any) {
    product.quantity++;
  }

  decreaseProduct(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.removeProduct(product);
    }
  }

  removeProduct(product: any) {
    this.cart = this.cart.filter(item => item !== product);
  }

  getTotal() {
    return this.cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  clearCart() {
  this.cart = [];
  }
}