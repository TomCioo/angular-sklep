import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('powinien dodać produkt do koszyka', () => {
    const product = {
      id: 1,
      name: 'Laptop',
      price: 3000
    };

    service.addProduct(product);

    expect(service.cart.length).toBe(1);
    expect(service.cart[0].quantity).toBe(1);
  });

});