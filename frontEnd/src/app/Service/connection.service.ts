import {Injectable, signal} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../Environement/environement';
import { JWT } from '../Interface/JWT';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private readonly KEY_TOKEN = 'authToken';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private apiUrl = environment.apiUrl;

  isAuthenticated = signal<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public login(credentials:{username: string; password:string}): Observable<JWT> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    // Headers pour form-urlencoded
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<JWT>(
      `${this.apiUrl}/Utilisateurs/login`,
      body.toString(),
      { headers }

    ).pipe(
      tap(response => {
        // Sauvegarder le token et les infos utilisateur
        if (response.token) {
          localStorage.setItem(this.KEY_TOKEN, response.token);
        }
        //localStorage.setItem();
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.KEY_TOKEN);
    //localStorage.removeItem('currentUser');
    this.isAuthenticated.set(false);
    this.router.navigate(['/connection']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY_TOKEN);
  }


  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.KEY_TOKEN);
  }

}
