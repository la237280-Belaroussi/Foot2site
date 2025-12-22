import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart_user_' + (localStorage.getItem('userId') ?? 'guest');

  private cart: any[] = this.loadCart();

  private loadCart(): any[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const item = this.cart.find(p => p.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      this.cart.push(product);
    }
    this.saveCart();
  }

  increase(id: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) item.quantity++;
    this.saveCart();
  }

  decrease(id: number) {
    const item = this.cart.find(p => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
    this.saveCart();
  }

  remove(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.saveCart();
  }

  clear() {
    this.cart = [];
    this.saveCart();
  }

  total() {
    return this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
