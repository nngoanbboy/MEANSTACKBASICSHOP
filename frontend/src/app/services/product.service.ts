import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProductDetail(id: string) {
    return this.http.get<Response<Product>>(
      `http://127.0.0.1:5000/api/products/${id}`
    );
  }
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:5000/api/products';
  getProducts(): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(this.baseUrl);
  }

  addProduct(product: Product): Observable<Response<Product>> {
    return this.http.post<Response<Product>>(this.baseUrl, product).pipe(
      map((response) => {
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response format');
        }
        return {
          success: !!response.success,
          status: response.status || 0,
          message: response.message || '',
          data: response.data || ({} as Product),
        };
      })
    );
  }

  updateProduct(id: string, product: Product) {
    return this.http.put<Response<Product>>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<Response<any>>(`${this.baseUrl}/${id}`);
  }
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  __v: number;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
