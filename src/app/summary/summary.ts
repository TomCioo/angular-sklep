import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary',
  imports: [RouterLink,MatButtonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {

  constructor(public cartService: CartService) {}
  backToShop() {
  this.cartService.clearCart();
  }
}