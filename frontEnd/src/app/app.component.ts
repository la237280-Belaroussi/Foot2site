import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <header class="navbar">

      <div class="nav-left">
        <a routerLink="/accueil" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <img src="logo.png" alt="Foot2Site" class="logo" />
        </a>
      </div>

      <nav class="nav-center">
        <a routerLink="/produits" routerLinkActive="active">Nos maillots</a>
        <a routerLink="/apropos" routerLinkActive="active">À propos</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </nav>

      <nav class="nav-right">

        <!-- PANIER -->
        <a routerLink="/panier" routerLinkActive="active" *ngIf="isLogged()">
          <img src="panier.png" alt="Panier" class="icon" />
        </a>

        <!-- PROFIL (icone inchangée) -->
        <a routerLink="/*" routerLinkActive="active" *ngIf="isLogged()">
          <img src="profile.png" alt="Profil" class="icon" />
        </a>

        <a
          *ngIf="!isLogged()"
          routerLink="/connection"
          class="auth-login"
        >
          Connexion
        </a>
        
        <a
          *ngIf="isLogged()"
          (click)="logout()"
          class="auth-logout"
        >
          Déconnexion
        </a>



      </nav>
    </header>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/connection']);
  }
}
