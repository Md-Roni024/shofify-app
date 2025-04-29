import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { StateService } from './state.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.BASE_URL}/products`;

  constructor(private http: HttpClient, private stateService: StateService) {}

  // Get all products and update the global state
  getAllProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.stateService.setProducts(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Get product by ID and update the selected product state
  getProductById(id: number): void {
    const allProducts = this.stateService.products.getValue();
  
    const product = allProducts.find(product => product.id === id);
  
    if (product) {
      // Product found in state, no need to call API
      this.stateService.setSelectedProduct(product);
    } else {
      // Product not found in state, fallback to API
      this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe({
        next: (data) => {
          this.stateService.setSelectedProduct(data);
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }
  
}
