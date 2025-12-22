import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive],
    template: `
    <header class="navbar">
  
    <div class="nav-left">
        <a routerLink="/accueil" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <img src="logo.png" alt="Foot2Site" class="logo" />
        </a>
    </div>
  
      <nav class="nav-center">
        <a routerLink="/*" routerLinkActive="active">Nos maillots</a>
        <a routerLink="/*" routerLinkActive="active">À propos</a>
        <a routerLink="/*" routerLinkActive="active">Contact</a>
      </nav>
  
      <nav class="nav-right">    
      <a routerLink="panier" routerLinkActive="active">
        panier
        <img src="panier.png" alt="Panier" class="icon" />
      </a>
  
      <a routerLink="/*" routerLinkActive="active">
        <img src="profile.png" alt="Profil" class="icon" />
      </a>
      
      </nav>
    </header>
  
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `
  ,
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {}
