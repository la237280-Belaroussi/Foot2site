import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  constructor(private http: HttpClient) { }
  getAll() { return this.http.get<any[]>('http://localhost:8080/api/produits'); }
}
