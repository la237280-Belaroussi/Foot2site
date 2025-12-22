import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { CartItem } from '../Interface/cart-item';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  plus(id: number) {
    this.cartService.increase(id);
  }

  minus(id: number) {
    this.cartService.decrease(id);
  }

  delete(id: number) {
    this.cartService.remove(id);
    this.cartItems = this.cartService.getCart();
  }

  total() {
    return this.cartService.getTotal();
  }
}
