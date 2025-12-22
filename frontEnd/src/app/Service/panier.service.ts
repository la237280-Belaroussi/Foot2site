import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierItem } from '../model/panier-item.model';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private panier$ = new BehaviorSubject<PanierItem[]>([]);

  getPanier() {
    return this.panier$.asObservable();
  }

  loadMockData() {
    const mockPanier: PanierItem[] = [
      { produitId: 1, nom: 'Maillot PSG', prix: 89.99, quantite: 1 },
      { produitId: 2, nom: 'Maillot Real Madrid', prix: 99.99, quantite: 2 },
      { produitId: 3, nom: 'Maillot FC Barcelone', prix: 79.99, quantite: 1 }
    ];
    this.panier$.next(mockPanier);
  }

  updateQuantity(produitId: number, quantite: number) {
    const panier = this.panier$.value.map(p =>
      p.produitId === produitId ? { ...p, quantite } : p
    );
    this.panier$.next(panier);
  }

  removeItem(produitId: number) {
    this.panier$.next(this.panier$.value.filter(p => p.produitId !== produitId));
  }

  getTotal(): number {
    return this.panier$.value.reduce(
      (total, item) => total + item.prix * item.quantite,
      0
    );
  }
  clearPanier() {
  this.panier$.next([]);
}


}
