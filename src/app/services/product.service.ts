import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../models/produc-dto';
import { ProductPage } from '../models/product-page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl = 'http://localhost:8080/produto'


  constructor(private http: HttpClient) { }

  createProduct(product: ProductDTO, token: String): Observable<ProductDTO> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${token}`});
    return this.http.post<ProductDTO>(this.baseUrl, product, {headers});
}

    getAllProducts(token: String, page: number = 0, size: number = 20): Observable<ProductPage> {
      const headers = new HttpHeaders({'Authorization':`Bearer ${token}`})
      const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

      return this.http.get<ProductPage>(this.baseUrl, {headers, params});
    }
  
    getProductById(id: number, token: String): Observable<ProductDTO> {
      const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
      });
      return this.http.get<ProductDTO>(`${this.baseUrl}/${id}`, {headers});
    
    }

    getProductByCategory(categoria: string, token: String, page: number = 0, size: number = 10): Observable<ProductPage> {
      const headers = new HttpHeaders({'Authorization':`Bearer ${token}`});
      const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
      return this.http.get<ProductPage>(`${this.baseUrl}/categoria/${categoria}`, {headers, params});
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