import {Component,CUSTOM_ELEMENTS_SCHEMA,ElementRef,AfterViewInit,OnDestroy,PLATFORM_ID,inject,viewChild} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  imports: [RouterLink, MatButtonModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage implements AfterViewInit, OnDestroy {

  products = products;
  id = '';

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly zoomFrame = viewChild<ElementRef<HTMLElement>>('zoomFrame');
  private zoom?: { uninit(): void };

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  get product() {
    return this.products.find(p => p.id === Number(this.id));
  }

  get otherProducts() {
    return this.products.filter(p => p.id !== Number(this.id));
  }

  addToCart() {
    if (this.product) {
      this.cartService.addProduct(this.product);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      if (!this.zoomFrame()) return;
      this.zoom = new InnerImageZoom('.image-frame.iiz') as unknown as { uninit(): void };
    }, 100);
  }

  ngOnDestroy(): void {
    this.zoom?.uninit();
  }
}