import { Injectable,inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpService= inject(HttpService);
  private apiUrl = `${environment.BASE_URL}/products`;
  private stateService= inject(StateService)

  getAllProducts() {
    this.httpService.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.stateService.setProducts(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  getProductById(id: number): void {
    const allProducts = this.stateService.products.getValue();
    const product = allProducts.find(product => product.id === id);
    if (product) {
      this.stateService.setSelectedProduct(product);
    } else {
      this.httpService.get<Product>(`${this.apiUrl}/${id}`).subscribe({
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
