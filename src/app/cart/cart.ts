import { Component,Input } from '@angular/core';
import { CartService } from '../cart.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  @Input() modal = false;

  constructor(public cartService: CartService) {}

  increaseProduct(product: any) {
    this.cartService.increaseProduct(product);
  }

  decreaseProduct(product: any) {
    this.cartService.decreaseProduct(product);
  }

  removeProduct(product: any) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}