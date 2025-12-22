import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits() {
    this.produits = [
      {
        id: 1,
        nom_produit: "T-shirt",
        description_produit: "T-shirt coton",
        prix_unitaire_produit: 20,
        stocks: [
          { quantite: 10, taille: { taille: "S" } },
          { quantite: 5, taille: { taille: "M" } }
        ]
      },
      {
        id: 2,
        nom_produit: "Jean",
        description_produit: "Jean slim",
        prix_unitaire_produit: 50,
        stocks: [
          { quantite: 8, taille: { taille: "L" } }
        ]
      }
    ];
  }

  getProduitById(id: number) {
    const produit = this.produits.find(p => p.id === id);
    if (produit) {
      this.editProduit = { ...produit };
    } else {
      console.warn('Produit non trouvé avec cet ID :', id);
    }
  }

  ajouterProduit() {
    const newId = this.produits.length ? Math.max(...this.produits.map(p => p.id)) + 1 : 1;
    const produit = { ...this.nouveauProduit, id: newId };
    this.produits.push(produit);
    this.nouveauProduit = { nom_produit: '', description_produit: '', prix_unitaire_produit: 0, stocks: [] };
  }

  sauverEdition() {
    const index = this.produits.findIndex(p => p.id === this.editProduit.id);
    if (index !== -1) {
      this.produits[index] = { ...this.editProduit };
    }
    this.editProduit = null;
  }

  supprimerProduit(id: number) {
    this.produits = this.produits.filter(p => p.id !== id);
  }

  annulerEdition() {
    this.editProduit = null;
  }
}
