import { Directive, HostListener, Input } from '@angular/core';
import { CartService } from '../Service/cart.service';

@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {

  @Input('appAddToCart') produit: any;

  constructor(private cartService: CartService) {}

  @HostListener('click')
  onClick() {
    if (!this.produit) return;

    this.cartService.addToCart({
      id: this.produit.id,
      name: this.produit.nom_produit,
      description: this.produit.description_produit,
      price: this.produit.prix_unitaire_produit,
      image: this.produit.image ?? 'assets/default.png',
      quantity: 1
    });
  }
}
