import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class Payment {

  error = '';

  paymentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    paymentMethod: new FormControl('blik', Validators.required),
    blik: new FormControl('', [Validators.pattern(/^\d{6}$/)]),
    card: new FormControl('')
  });

  constructor(
    private router: Router,
    public cartService: CartService
  ) {}

   increaseProduct(product: any) {
    this.cartService.increaseProduct(product);
  }

   decreaseProduct(product: any) {
    this.cartService.decreaseProduct(product);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  pay() {

  this.error = '';

  const method = this.paymentForm.value.paymentMethod;

  if (method === 'blik') {
  const blikControl = this.paymentForm.controls.blik;

  if (!blikControl.value || blikControl.invalid) {
    blikControl.markAsTouched();
    this.error = 'Kod BLIK musi zawierać 6 cyfr.';
    return;
  }
}

  if (method === 'card') {
    const card = this.paymentForm.value.card;

    if (!card) {
      this.paymentForm.controls.card.markAsTouched();
      this.error = 'Podaj numer karty.';
      return;
    }
  }

  if (this.paymentForm.invalid) {
    this.paymentForm.markAllAsTouched();
    return;
  }

  if (Math.random() < 0.1) {
    this.error = 'Wystąpił błąd podczas płatności. Spróbuj ponownie.';
    return;
  }

  this.router.navigate(['/summary']);
}
}