import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
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
      error: (err) => console.error(err)
    });
  }

  getProduitById(id: number) {
    this.http.get<any>(`/api/Produits/${id}`).subscribe({
      next: (data) => this.editProduit = data
    });
  }

  ajouterProduit() {
    this.http.post<any>('/api/Produits', this.nouveauProduit).subscribe({
      next: (data) => {
        this.produits.push(data);
        this.nouveauProduit = {
          nom_produit: '',
          description_produit: '',
          prix_unitaire_produit: 0,
          stocks: []
        };
      }
    });
  }

  sauverEdition() {
    this.http.put<any>(`/api/Produits/${this.editProduit.id}`, this.editProduit)
      .subscribe({
        next: (data) => {
          const index = this.produits.findIndex(p => p.id === data.id);
          if (index !== -1) this.produits[index] = data;
          this.editProduit = null;
        }
      });
  }

  supprimerProduit(id: number) {
    this.http.delete(`/api/Produits/${id}`).subscribe({
      next: () => {
        this.produits = this.produits.filter(p => p.id !== id);
      }
    });
  }

  annulerEdition() {
    this.editProduit = null;
  }
}