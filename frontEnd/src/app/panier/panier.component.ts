import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../Service/panier.service';
import { Observable } from 'rxjs';
import { PanierItem } from '../model/panier-item.model';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {

  panier$!: Observable<PanierItem[]>;

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panier$ = this.panierService.getPanier(); 
    this.panierService.loadMockData();       
  }

  update(id: number, event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.panierService.updateQuantity(id, value);
  }

  remove(id: number) {
    this.panierService.removeItem(id);
  }

  total() {
    return this.panierService.getTotal();
  }
  validerCommande() {
  const total = this.total();

  if (total === 0) {
    return;
  }

  console.log('Commande validée');
  console.log('Total :', total);

  alert(`Commande validée ! Total : ${total.toFixed(2)} €`);
 this.panierService.clearPanier();
  // plus tard :
  // - envoyer au backend
  // - vider le panier
}

}
