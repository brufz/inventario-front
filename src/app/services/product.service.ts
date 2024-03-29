import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../models/produc-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl = 'http://localhost:8080/produto'

  constructor(private http: HttpClient) { }

  createProduct(product: ProductDTO, token: String): Observable<ProductDTO> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.post<ProductDTO>(this.baseUrl, product, {headers});
}
  
    getProductById(id: number, token: String): Observable<ProductDTO> {
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
      return this.http.get<ProductDTO>(`${this.baseUrl}/${id}`, {headers});
    
    }

    getProductByCategory(categoria: string, token: String): Observable<ProductDTO[]> {
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
      return this.http.get<ProductDTO[]>(`${this.baseUrl}/categoria/${categoria}`, {headers});
    }

    deleteProductById(id: number, token: String): Observable<ProductDTO> {
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
      return this.http.delete<ProductDTO>(`${this.baseUrl}/${id}`, {headers});
    }

    editProductById(id: number, product: ProductDTO, token: String): Observable<ProductDTO> {
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
      return this.http.put<ProductDTO>(`${this.baseUrl}/${id}`,product, {headers});
    }
}