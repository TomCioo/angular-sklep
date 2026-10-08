import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { products } from '../products';



@Component({
  selector: 'app-product-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  products = products;
  id = '';

  currentIndex = 0;

    constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.currentIndex = 0;
    });
  }
  get product() {
    return this.products.find(product => product.id === Number(this.id));
  }

  get otherProducts() {
    return this.products.filter(product => product.id !== Number(this.id));
  }

  nextProduct() {
    if (this.currentIndex < this.otherProducts.length - 1) {
      this.currentIndex++;
    }
  }

  previousProduct() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  addToCart() {
  if (this.product) {
    this.cartService.addProduct(this.product);
  }
}
}