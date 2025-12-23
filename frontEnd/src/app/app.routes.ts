import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {AccueilComponent} from './accueil/accueil.component';
import {ProduitsComponent} from './produits/produits.component';

export const routes: Routes = [
    {
        path : 'connection',
        component : ConnectionComponent,
    },

    {
        path : 'insci',
        component : InscriptionComponent,
    },

    {
      path : 'accueil',
      component : AccueilComponent,
    },

    {
        path : '',
        redirectTo : 'connection',
        pathMatch : 'full',
    },

    {
      path : 'produits',
      component :  ProduitsComponent,
    }
];
