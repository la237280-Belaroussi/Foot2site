import { Component } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  standalone: true,
  imports : [CommonModule],
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  constructor(public cartService: CartService) {}
}
