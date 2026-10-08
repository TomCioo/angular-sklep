import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { products } from '../products';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  products = products;

}