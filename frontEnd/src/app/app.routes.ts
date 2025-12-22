import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [

  {
    path: 'accueil',
    component: AccueilComponent
  },

  {
    path: 'connection',
    component: ConnectionComponent
  },

  {
    path: 'inscription',
    component: InscriptionComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
  
];
