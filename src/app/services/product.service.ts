import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../models/produc-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private urlPost = 'http://localhost:8080/produto'

  constructor(private http: HttpClient) { }

  createProduct(produto: ProductDTO, token: String): Observable<ProductDTO> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.post<ProductDTO>(this.urlPost, produto, {headers});
}
}