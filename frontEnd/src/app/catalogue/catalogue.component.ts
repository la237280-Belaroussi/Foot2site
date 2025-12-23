import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Service/cart.service';
import { CompositionService } from '../Service/composition.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products: any[] = [];

  constructor(
    private compositionService: CompositionService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.compositionService.getAll().subscribe({
      next: (data: any) => this.products = data,
      error: (err: any) => console.error(err)
    });
  }

  addToCart(product: any) {
  console.log('Produit ajouté:', product);

  this.cartService.addToCart({
    id: product.id,
    name: product.name ?? product.nom_produit,
    price: product.price ?? product.prix_unitaire_produit,
    image: 'assets/tshirt.jpg'
  });
}

}
