import { Injectable } from '@angular/core';
import { CartItem } from '../Interface/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private getUserId(): number | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).userId : null;
  }

  private getCartKey(): string {
    const userId = this.getUserId();
    return userId ? `cart_user_${userId}` : 'cart_guest';
  }

  private loadCart() {
    const saved = localStorage.getItem(this.getCartKey());
    this.cart = saved ? JSON.parse(saved) : [];
  }

  private saveCart() {
    localStorage.setItem(this.getCartKey(), JSON.stringify(this.cart));
  }

  reloadCart() {
    this.loadCart();
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: CartItem) {
    const item = this.cart.find(p => p.id === product.id);
    if (item) item.quantity++;
    else this.cart.push({ ...product, quantity: 1 });
    this.saveCart();
  }

  increase(id: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) {
      item.quantity++;
      this.saveCart();
    }
  }

  decrease(id: number) {
    const item = this.cart.find(p => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  remove(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.saveCart();
  }

  clear() {
    this.cart = [];
    this.saveCart();
  }

  getTotal() {
    return this.cart.reduce((t, i) => t + i.price * i.quantity, 0);
  }

  getCount() {
    return this.cart.reduce((t, i) => t + i.quantity, 0);
  }
}
