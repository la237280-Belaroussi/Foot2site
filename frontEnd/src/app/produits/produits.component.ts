import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits: any[] = [];
  nouveauProduit: any = {
    nom_produit: '',
    description_produit: '',
    prix_unitaire_produit: 0,
    stocks: []
  };
  editProduit: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits() {
    this.http.get<any[]>('/api/Produits').subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur lors du chargement des produits', err)
    });
  }

  getProduitById(id: number) {
    this.http.get<any>(`/api/Produits/${id}`).subscribe({
      next: (data) => this.editProduit = data,
      error: (err) => console.error('Produit non trouvé', err)
    });
  }

  ajouterProduit() {
    this.http.post<any>('/api/Produits', this.nouveauProduit).subscribe({
      next: (data) => {
        this.produits.push(data);
        this.nouveauProduit = { nom_produit: '', description_produit: '', prix_unitaire_produit: 0, stocks: [] };
      },
      error: (err) => console.error('Erreur lors de l’ajout du produit', err)
    });
  }

  sauverEdition() {
    this.http.put<any>(`/api/Produits/${this.editProduit.id}`, this.editProduit).subscribe({
      next: (data) => {
        const index = this.produits.findIndex(p => p.id === data.id);
        if (index !== -1) this.produits[index] = data;
        this.editProduit = null;
      },
      error: (err) => console.error('Erreur lors de la modification', err)
    });
  }

  supprimerProduit(id: number) {
    this.http.delete(`/api/Produits/${id}`).subscribe({
      next: () => this.produits = this.produits.filter(p => p.id !== id),
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }

  annulerEdition() {
    this.editProduit = null;
  }
}
