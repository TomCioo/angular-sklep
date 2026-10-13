import {Component,CUSTOM_ELEMENTS_SCHEMA,viewChild,ElementRef,AfterViewInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { products } from '../products';
import { register } from 'swiper/element/bundle';
import InnerImageZoom from 'inner-image-zoom';

register();

@Component({
  selector: 'app-product-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})

export class ProductPage implements AfterViewInit, OnDestroy {
  
  products = products;
  id = '';

  currentIndex = 0;

  private readonly zoomFrame =
    viewChild<ElementRef<HTMLElement>>('zoomFrame');

  private zoom?: {
    uninit(): void;
  };

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
    return this.products.find(
      product => product.id === Number(this.id)
    );
  }

  get otherProducts() {
    return this.products.filter(
      product => product.id !== Number(this.id)
    );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addProduct(this.product);
    }
  }

  ngAfterViewInit(): void {
    if (this.zoomFrame()) {
      this.zoom = new InnerImageZoom(
        '.image-frame.iiz'
      ) as unknown as {
        uninit(): void;
      };
    }
  }

  ngOnDestroy(): void {
    this.zoom?.uninit();
  }
}