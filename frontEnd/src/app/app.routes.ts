import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {AccueilComponent} from './accueil/accueil.component';
import { PanierComponent } from './panier/panier.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

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
        path : 'shop',
        component : CatalogueComponent,
    },

    {
      path : 'panier',
      component : PanierComponent,
    },

    {
        path : '',
        redirectTo : 'connection',
        pathMatch : 'full',
    }
];
