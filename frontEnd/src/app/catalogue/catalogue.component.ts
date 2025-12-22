import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanierComponent } from '../panier/panier.component';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, PanierComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent {

}
