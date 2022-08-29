import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/product`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/product`, product);
  }

  public updateProduct(product: Product): Observable<any> {
    return this.http.put<Product>(`${this.url}/product/${product.id}`, product);
  }

  public deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/${product.id}`);
  }

}
